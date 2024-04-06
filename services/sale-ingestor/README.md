# Sale Ingestor

This is a component of the swap-ease mono-repo. It is a service that processes new trading activity for a collection. Each new sale is stored in a specific manner, which is detailed below. It will specifically perform these actions:

- Read new trading activity
- Determine if the sale belongs to a collection that is tracked
- Make the necessary changes to the sale document
- Aggregate the sale data within the cluster it resides in and the clustersAggregate document.

# Getting started

## Environment variables

Create a `.env` file and copy and paste the below into that file. Replace the links with the actual environment variable value.

```
MONGO_DB_NAME=swapEase
MONGO_DB_CONNECTION_STRING=[Go here](https://cloud.mongodb.com/v2/63126bef095c44751357180b#/overview?connectCluster=Cluster0)
RESERVOIR_WEBSOCKET_URL=
```

# Operations

Sales will come from the Websocket/Ingestor service. These are the events present from the websocket:

- `sale.created`
- `sale.update`
- `sale.deleted`

Be aware that there could be duplicate Sales because normally it can be represented through a buyer side and a seller side. Some filtering may need to occur so that we dont run into a duplicate Sale, but from different perspectives (i.e BUYER or SELLER).

## Handling operations

When we perform any operation, we perform these general actions:

- Update the `clustersAggregate` document for the associated `contractAddress`
- Update the `cluster` document for the associated `contractAddress`
- Update the `sales` collection or `sale` document with the appropriate action (i.e `add`, `update`, or `delete`)

### Handling `sale.created` operations

For `sale.created` operation, we perform these specific actions:

- Update the `clustersAggregate` document for the associated `contractAddress` where applicable:
  - Update `updatedAt` field with new date
  - Increment `totalSales` field by 1
  - Increment `totalVolume` field by ETH value in sale
  - Update `totalSalesByMarketplace` object by incrementing the counter, for the domain the sale occurred in, by 1
- Update the `cluster` document for the associated `contractAddress` where applicable:
  - Update `updatedAt` field with new date
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

- Update the `clustersAggregate` document for the associated `contractAddress` where applicable:
  - Update `updatedAt` field with new date
  - Decrement `totalSales` field by 1
  - Decrement `totalVolume` field by ETH value in sale
  - Update `totalSalesByMarketplace` object by decrementing the counter, for the domain the sale occurred in, by 1
- Update the `cluster` document for the associated `contractAddress` where applicable:
  - Update `updatedAt` field with new date
  - Decrement `totalSales` field by 1
  - Decrement `totalVolume` field by ETH value in sale
  - Update `totalSalesByMarketplace` object by decrementing the counter, for the domain the sale occurred in, by 1
  - Update `latestSaleBlockNumber` field with new block number from sale
- Remove the sale from the `sales` collection

# Processes and structures

We will always retrieve only 1 sale from the webhook. We need to perform the above actions on a per sale basis.
