async function writeTransaction(client, db, sale) {
  const session = client.startSession();

  const clusters = db.collection('clusters');
  const clustersAggregate = db.collection('clustersAggregate');

  // Create base update document to use for incrementing
  const baseDoc = {
    totalVolume: sale.price.amount.decimal,
  };

  // Add marketplace fill source using dot notation
  baseDoc[`totalSalesByMarketplace.${sale.fillSource}`] = 1;

  try {
    await session.withTransaction(async () => {
      await clusters.updateOne(
        { clusterId: sale.clusterId },
        {
          $inc: baseDoc,
          $set: {
            latestSaleBlockNumber: sale.block,
          },
        }
      );

      await clustersAggregate.updatedOne(
        { contractAddress: sale.contractAddress },
        {
          $inc: baseDoc,
        }
      );
    });
  } catch (error) {
    console.error(err);
    await session.abortTransaction();
    throw new Error('Could not commit transaction');
  } finally {
    await session.endSession();
  }
}

exports = async function AggregateNewSale(changeEvent) {
  const client = context.services.get('mongodb-atlas');
  const db = client.db('swapEase');

  const sale = changeEvent.fullDocument;

  try {
    // If this is an "insert" event, insert the document into the other collection
    if (changeEvent.operationType === 'insert' && sale.batchId === null) {
      await writeTransaction(client, db, sale);
    }

    return true;
  } catch (error) {
    console.log(error);
    console.log(`Could not aggregate sale with _id: ${sale._id}`);
  }
};
