import uuid
import datetime
import traceback
from models.sale import Sale
from models.cluster import Cluster
from config.mongoDb import get_client
from data.sales.salesClass import SalesClass
from data.clusters.clusters import ClustersClass
from models.clusterAggregate import ClustersAggregate
from apis.saleIngestor.saleIngestor import SaleIngestor
from pymongo.errors import ConnectionFailure, OperationFailure
from apis.reservoir.salesClass import SalesClass as ReservoirAPISales
from data.clustersAggregate.clustersAggregate import ClusterAggregatesClass
from classes.generateClusters.generateClustersClass import GenerateClustersClass

# TODO: Looking up a future sale can involve an inverse search, where we create a dictionary of tokenIds that have the corresponding cluster as the value
# TODO: When adding the tokens to the DB, create a compound index on clusterId, contractAddress, tokenId, and rank.
# TODO: Rename clusterAggregates to clustersAggregate for single and clustersAggregates for multi (update collection name to multi)
# TODO: Once address is fully processed, remove contract address from queue in DB collection

class AggregateClustersAndSales:
    def __init__(self):
        # API classes
        self.generateClustersClass = GenerateClustersClass()
        self.reservoirApiSales = ReservoirAPISales()
        self.saleIngestor = SaleIngestor()

        # Data classes
        self.sales = SalesClass()
        self.clusters = ClustersClass()
        self.clustersAggregate = ClusterAggregatesClass()

        # Session
        self.client = get_client()

    def handler(self, contractAddress: str):
        try:
            # Check if contractAddress already exists
            result = self.clustersAggregate.getClustersAggregate(contractAddress)

            if (result is not None):
                raise Exception('Contract address already exists')

            # Generate clusters for the contract address
            clusters = self.generateClustersClass.handler(contractAddress)

            # Get all sales for the contract address
            sales = self.reservoirApiSales.getSales(contractAddress)

            # Create an aggregate for all of the clusters
            clustersAggregate = self.__aggregateSales(
                contractAddress, clusters, sales)

            # Save all data under a DB transaction
            # I have removed the session parameter from .addSales() to keep it outside of the transaction, what are the ramifications?
            with self.client.start_session() as session:
                self.__runTransactionWithRetry(
                    clustersAggregate,
                    clusters,
                    sales,
                    session
                )

            # Cache new collection in sale ingestor
            # self.saleIngestor.callCacheCollection(contractAddress)

            return 'Success', 200
        except:
            traceback.print_exc()
            print('Could not generate clusters and sales for {}'.format(contractAddress))
            return f'Failure', 500

    """
    Aggregates all necessary information from the list of sales and creates data for each cluster and collection.
    It adds clusterIds to all sales and adds aggregate data to each of the clusters.

    @contractAddress: The collection's contract address.
    @clusters: List of clusters
    @sales: List of sales
    @returns ClustersAggregate, which is an aggregate of all of the clusters (can also be known as an aggregate for all sales data in a collection).
    """

    def __aggregateSales(self, contractAddress: str, clusters: list[Cluster], sales: list[Sale]):
        # Bucket all sales for easier processing
        salesByTokenId = self.__bucketSales(sales)

        # Aggregates for the collection
        collectionTotalVolume = 0
        collectionTotalSalesByMarketplace: dict[str, int] = {}
        collectionLatestSaleBlockNumber = 0

        # Loop through each cluster and their tokenIds, match tokenIds against salesByTokenId dictionary
        for cluster in clusters:
            # Aggregates for the cluster
            totalVolume = 0
            totalSalesByMarketPlace: dict[str, int] = {}
            latestSaleBlockNumber = 0

            for tokenId in cluster.tokenIds:
                if tokenId in salesByTokenId:
                    for sale in salesByTokenId[tokenId]:
                        # Amount sold for in ETH
                        sellerFee = sale.price.amount.decimal

                        # Aggregates for total volume
                        collectionTotalVolume += sellerFee
                        totalVolume += sellerFee

                        # Aggregates for sales per marketplace
                        if sale.fillSource in collectionTotalSalesByMarketplace:
                            collectionTotalSalesByMarketplace[sale.fillSource] += 1
                        else:
                            collectionTotalSalesByMarketplace[sale.fillSource] = 1

                        if sale.fillSource in totalSalesByMarketPlace:
                            totalSalesByMarketPlace[sale.fillSource] += 1
                        else:
                            totalSalesByMarketPlace[sale.fillSource] = 1

                        # Attach clusterId to the sale so that sales can be correlated to a cluster
                        sale.clusterId = cluster.id

                        # Track the latest block number a sale occurred in for this cluster
                        latestSaleBlockNumber = max(
                            latestSaleBlockNumber, sale.block)
                        collectionLatestSaleBlockNumber = max(collectionLatestSaleBlockNumber, sale.block)

            # Apply aggregates for cluster
            cluster.totalVolume = totalVolume
            cluster.totalSalesByMarketplace = totalSalesByMarketPlace            
            cluster.latestSaleBlockNumber = latestSaleBlockNumber

        return ClustersAggregate(
            id=contractAddress,
            createdAt=datetime.datetime.utcnow(),
            updatedAt=datetime.datetime.utcnow(),
            latestSaleBlockNumber=collectionLatestSaleBlockNumber,
            totalVolume=collectionTotalVolume,
            totalSalesByMarketplace=collectionTotalSalesByMarketplace        
        )

    """
    Creates a dictionary of arrays where the key is the tokenID and the value is a Sale list. 
    Bucketing sales by tokenID helps aggregate the list of Sales faster

    @sales: List of sales
    @returns A dictionary where the key is the tokenID and the value is a Sale list.
    """

    def __bucketSales(self, sales: list[Sale]) -> dict[str, list[Sale]]:
        buckets: dict[str, list[Sale]] = {}

        for sale in sales:
            if sale.tokenId in buckets:
                buckets[sale.tokenId].append(sale)
            else:
                buckets[sale.tokenId] = [sale]

        return buckets

    def __runTransactionWithRetry(self, clustersAggregate: ClustersAggregate, clusters: list[Cluster], sales: list[Sale], session) -> None:
        while True:
            try:
                self.__saveClustersAndSales(
                    clustersAggregate, clusters, sales, session)
                break
            except (ConnectionFailure, OperationFailure) as exc:
                print("Transaction aborted. Caught exception during transaction.")

                # If transient error, retry the whole transaction
                if exc.has_error_label("TransientTransactionError"):
                    print("TransientTransactionError, retrying transaction ...")
                    continue
                else:
                    traceback.print_exc()
                    raise Exception('Could not perform transaction')

    def __saveClustersAndSales(self, clustersAggregate: ClustersAggregate, clusters: list[Cluster], sales: list[Sale], session) -> None:
        # Start a transaction to ensure that all data is saved in the DB
        with session.start_transaction():
            self.clustersAggregate.addClustersAggregate(
                clustersAggregate, session)
            self.clusters.addClusters(clusters, session)
            self.sales.addSales(sales, session)

            while True:
                try:
                    session.commit_transaction()
                    print("Transaction committed")
                    break
                except (ConnectionError, OperationFailure) as exc:
                    if exc.has_error_label("UnknownTransactionCommitResult"):
                        print(
                            "UnknownTransactionCommitResult, retrying commit operation ...")
                        continue
                    else:
                        print("Error during commit ...")
                        raise