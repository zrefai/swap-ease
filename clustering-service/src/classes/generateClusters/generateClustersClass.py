import uuid
import datetime
import traceback
import pandas as pd
from config.mongoDb import get_client
from data.tokens.tokens import Tokens
from models.token import Token, Attribute
from models.cluster import Cluster
from dataProcessing.clusteringAlgorithms.KMeans import getKMeanLabels


class GenerateClustersClass:
    def __init__(self):
        self.tokens = Tokens()
        self.client = get_client()

    def handler(self, contractAddress: str) -> list[Cluster]:
        try:
            tokens = self.tokens.getTokensForACollection(
                contractAddress)

            # Get list of traitTypes from any token since we know that each token will contiain at least one of every traitType for a collection
            columns = list(map(
                lambda a: a.key, tokens[0].attributes))

            return self.__transformDataToClusters(contractAddress=contractAddress, tokens=tokens, columns=columns)

        except Exception:
            traceback.print_exc()
            print('Could not generate clusters for {}'.format(contractAddress))
            return f'Failure', 500

    def __transformDataToClusters(self, contractAddress: str, tokens: list[Token], columns: list[str]) -> list[Cluster]:
        # Generate clusters from ranked data
        dataFrame = self.__formatRankedData(tokens=tokens, columns=columns)
        # Every label is a different number (equivalent to a cluster number) and correlate positionally to tokenIds in the dataFrame
        labels = getKMeanLabels(dataFrame)
        currentTime = datetime.datetime.utcnow()

        clustersByLabel: dict[str, Cluster] = {}

        # Get each label for each tokenId, and add tokenId to each cluster under each label in the dictionary (where key-value is label-Cluster)
        # tokenId in dataFrame also correlates positionally do the same tokenId in the list of tokens
        for index, tokenId in enumerate(dataFrame.index):
            label = labels[index]

            if label in clustersByLabel.keys():
                labelItem = clustersByLabel[label.item()]

                # Add token to list of tokens in cluster
                labelItem.tokenIds.append(tokenId)

                # Add token rank to rank average, we will do average calculation below this for loop
                labelItem.rankAverage += tokens[index].rank

                # Add attributes to running counts of attributes in clusters
                self.__addToAttributesCount(
                    labelItem.attributes, tokens[index].attributes)
            else:
                newAttributes: dict[str, dict[str, int]] = {}

                # Add attributes to empty dictionary of attributes in clusters
                self.__addToAttributesCount(
                    newAttributes, tokens[index].attributes)

                clustersByLabel[label.item()] = Cluster(
                    id=str(uuid.uuid4()),
                    contractAddress=contractAddress,
                    createdAt=currentTime,
                    updatedAt=currentTime,
                    tokenIds=[tokenId],
                    rankAverage=tokens[index].rank,
                    attributes=newAttributes
                )

        clusters = list(clustersByLabel.values())

        # Calculate rank averages for each cluster
        for cluster in clusters:
            cluster.rankAverage = (
                cluster.rankAverage / len(cluster.tokenIds))

        return list(clustersByLabel.values())

    def __formatRankedData(self, tokens: list[Token], columns: list[str]) -> pd.DataFrame:
        columnsCount: dict[str, int] = {}

        # Get the max number of occurances of a trait across all tokens
        for column in columns:
            for collectionToken in tokens:
                result = [attribute for attribute in collectionToken.attributes
                          if attribute.key == column]

                if column in columnsCount:
                    columnsCount[column] = max(
                        columnsCount[column], len(result))
                else:
                    columnsCount[column] = len(result)

        dataFrameColumns: list[str] = []

        # Create columns list for data frame with max occurances accounted for
        for k in columnsCount:
            for i in range(1, columnsCount[k] + 1):
                dataFrameColumns.append(k)

        # Get list of indexes by tokenId
        indexes = [collectionToken.tokenId
                   for collectionToken in tokens]

        # Create data frame with columns and tokenIds as indexes
        dataFrame = pd.DataFrame(columns=[*dataFrameColumns], index=indexes)
        dataFrame.index.name = 'tokenId'

        # Loop through data frame columns to fill in data from attribute scores
        for index, token in enumerate(dataFrame.index):
            row = []

            # Format data per row
            for key in columnsCount:
                result = [attribute.score for attribute in tokens
                          [index].attributes if attribute.key == key]

                # Fill remaining columns of a trait type with 0s if no other data is available
                while len(result) < columnsCount[key]:
                    result.append(0)

                row += result

            # Fill entire row of data frame with newly formatted row
            dataFrame.loc[token] = row

        return dataFrame

    def __addToAttributesCount(self, attributesCount: dict[str, dict[str, int]], attributes: list[Attribute]) -> None:
        for attribute in attributes:
            if attribute.value == None:
                continue

            if attribute.key in attributesCount:
                if attribute.value in attributesCount[attribute.key]:
                    attributesCount[attribute.key][attribute.value] += 1
                else:
                    attributesCount[attribute.key][attribute.value] = 1
            else:
                attributesCount[attribute.key] = {}
                attributesCount[attribute.key][attribute.value] = 1

