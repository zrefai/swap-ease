# Aggregator processes

Sales will come from the Websocket/Ingestor service. These are the events present from the websocket:

- `sale.created`
- `sale.update`
- `sale.deleted`

Be aware that there could be duplicate Sales because normally it can be represented through a buyer side and a seller side. Some filtering may need to occure so that we dont run into a duplicate Sale, but from different perspectives (i.e BUYER or SELLER).

## Aggregation of items to be deleted

When retrieving `collections` and `clusters` documents, we can also get a list of the sales for a collection that are about to expire (i.e sales that exist on the 90th day). These sales have time stamps we can use to determine exactly when to remove them from the from the aggregate values of the documents above.

When new operations come in from the websocket service, we can check this array of expiring sales and determine if a sale needs to be de-aggregated.

### Handling `sale.expired` operation

When a sale in the "sales about to expire" cache goes past the 90 day boundary, we perform these general actions:

- Update the `collectionClustersMetadata` document for the associated `contractAddress` where applicable:
  - Update `lastUpdated` field with new date
  - Update `lowestSale` field if current value is the lowest value. Need to find next lowest value
  - Update `highestSale` field if the current value is the highest value. Need to find the next highest value
  - Decrement `totalSales` field by 1
  - Decrement `totalVolume` field by ETH value in sale
  - Update `totalSalesByMarketplace` object by decrementing the counter, for the domain the sale occurred in, by 1
- Update the `cluster` document for the associated `contractAddress` where applicable:
  - Update `lastUpdated` field with new date
  - Update `lowestSale` field if current value is the lowest value. Need to find next lowest value
  - Update `highestSale` field if the current value is the highest value. Need to find the next highest value
  - Decrement `totalSales` field by 1
  - Decrement `totalVolume` field by ETH value in sale
  - Update `totalSalesByMarketplace` object by decrementing the counter, for the domain the sale occurred in, by 1

## Handling operations

When we perform any operation, we perform these general actions:

- Update the `collectionClustersMetadata` document for the associated `contractAddress`
- Update the `cluster` document for the associated `contractAddress`
- Update the `sales` collection with the appropriate action (i.e `add`, `update`, or `delete`)

### Handling `sale.created` operations

For `sale.created` operation, we perform these specific actions:

- Update the `collectionClustersMetadata` document for the associated `contractAddress` where applicable:
  - Update `lastUpdated` field with new date
  - Update `lowestSale` field if it is lower than current value
  - Update `highestSale` field if it is higher than current value
  - Increment `totalSales` field by 1
  - Increment `totalVolume` field by ETH value in sale
  - Update `totalSalesByMarketplace` object by incrementing the counter, for the domain the sale occurred in, by 1
- Update the `cluster` document for the associated `contractAddress` where applicable:
  - Update `lastUpdated` field with new date
  - Update `lowestSale` field if it is lower than current value
  - Update `highestSale` field if it is higher than current value
  - Increment `totalSales` field by 1
  - Increment `totalVolume` field by ETH value in sale
  - Update `totalSalesByMarketplace` object by incrementing the counter, for the domain the sale occurred in, by 1
  - Update `latestSaleBlockNumber` field with new block number from sale
- Add the new sale to the `sales` collection

### Handling `sale.update` operations

For `sale.updated` operation, we perform these specific actions:

- Update the existing sale in the `sales` collection

### Handling `sale.deleted` operations

For `sale.deleted` operation, we perform these specific actions:

- Update the `collectionClustersMetadata` document for the associated `contractAddress` where applicable:
  - Update `lastUpdated` field with new date
  - Update `lowestSale` field if current value is the lowest value. Need to find next lowest value
  - Update `highestSale` field if the current value is the highest value. Need to find the next highest value
  - Decrement `totalSales` field by 1
  - Decrement `totalVolume` field by ETH value in sale
  - Update `totalSalesByMarketplace` object by decrementing the counter, for the domain the sale occurred in, by 1
- Update the `cluster` document for the associated `contractAddress` where applicable:
  - Update `lastUpdated` field with new date
  - Update `lowestSale` field if current value is the lowest value. Need to find next lowest value
  - Update `highestSale` field if the current value is the highest value. Need to find the next highest value
  - Decrement `totalSales` field by 1
  - Decrement `totalVolume` field by ETH value in sale
  - Update `totalSalesByMarketplace` object by decrementing the counter, for the domain the sale occurred in, by 1
  - Update `latestSaleBlockNumber` field with new block number from sale
- Remove the sale from the `sales` collection

# Processes and structures

We need to be able to treat a set of operations that exist for the same collection as a whole operation. For example, operation A for contract address C modifies the necessary documents. Operation B has the same contract address C also modifies the necessary documents. The order of operations on the necessary documents should, based on the timestamp, occur as A -> B: A modifies the document first, then B modifies the document after A.
