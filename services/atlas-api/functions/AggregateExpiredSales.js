const MS_IN_MINUTE = 60000;
const CURRENT_DATE = Date.now();
const NINETY_DAYS_AGO = new Date(CURRENT_DATE - 90 * 24 * 60 * MS_IN_MINUTE);

async function writeTransaction(client, db, sales) {
  const clustersUpdateDocuments = createUpdateDocumentsFromSales(
    sales,
    'clusterId'
  );
  const clusterAggregatesUpdateDocuments = createUpdateDocumentsFromSales(
    sales,
    'contractAddress'
  );
  const saleDeleteDocuments = createDeleteOneDocuments(sales);

  const clustersCollection = new ClustersCollection(db);
  const clustersAggregatesCollection = new ClustersAggregateCollection(db);
  const salesCollection = new SalesCollection(db);

  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      await clustersCollection.bulkWrite(clustersUpdateDocuments, session);
      await clustersAggregatesCollection.bulkWrite(
        clusterAggregatesUpdateDocuments,
        session
      );
      await salesCollection.bulkWrite(saleDeleteDocuments, session);
    });
  } catch (error) {
    console.error(err);
    await session.abortTransaction();
    throw new Error('Could not commit transaction');
  } finally {
    await session.endSession();
  }
}

exports = async function AggregateExpiredSale() {
  const client = context.services.get('mongodb-atlas');
  const db = client.db('swapEase');

  const salesCollection = new SalesCollection(db);

  const sales = await salesCollection.getSalesPastNinetyDays();

  if (sales.length === 0) {
    return true;
  }

  try {
    await writeTransaction(client, db, sales);
    return true;
  } catch (error) {
    console.log(error);
    console.log(
      `Could not aggregate expired sales for date: ${NINETY_DAYS_AGO}`
    );
  }
};

class SalesCollection {
  constructor(db) {
    this.collection = db.collection('sales');
  }

  async getSalesPastNinetyDays() {
    const sales = await this.collection
      .aggregate([
        {
          $match: {
            timestamp: {
              $lt: NINETY_DAYS_AGO,
            },
          },
        },
      ])
      .toArray();

    return sales;
  }

  async bulkWrite(documents, session) {
    const response = await this.collection.bulkWrite(documents, { session });
    return response.isOk();
  }
}

class ClustersCollection {
  constructor(db) {
    this.collection = db.collection('clusters');
  }

  async bulkWrite(documents, session) {
    const response = await this.collection.bulkWrite(documents, { session });
    return response.isOk();
  }
}

class ClustersAggregateCollection {
  constructor(db) {
    this.collection = db.collection('clustersAggregate');
  }

  async bulkWrite(documents, session) {
    const response = await this.collection.bulkWrite(documents, { session });
    return response.isOk();
  }
}

function createUpdateDocumentsFromSales(sales, property) {
  const aggregates = new Map();

  for (const sale of sales) {
    const properties = aggregates.get(sale[property]);

    if (properties) {
      const updatedProperties = { ...properties };

      updatedProperties.totalSales -= 1;
      updatedProperties.totalVolume -= sale.price.amount.decimal;

      if (
        Object.hasOwn(
          updatedProperties.totalSalesByMarketplace,
          sale.fillSource
        )
      ) {
        updatedProperties.totalSalesByMarketplace[sale.fillSource] -= 1;
      } else {
        updatedProperties.totalSalesByMarketplace[sale.fillSource] = -1;
      }

      aggregates.set(sale[property], updatedProperties);
    } else {
      const newProperties = {};

      newProperties.totalSales = -1;
      newProperties.totalVolume = -sale.price.amount.decimal;
      newProperties.totalSalesByMarketplace = {};
      newProperties.totalSalesByMarketplace[sale.fillSource] = -1;

      aggregates.set(sale[property], newProperties);
    }
  }

  return createUpdateOneDocuments(aggregates);
}

function createUpdateOneDocuments(aggregates) {
  const documents = [];

  const currentDate = new Date();

  for (const key of Array.from(aggregates.keys())) {
    const properties = aggregates.get(key);

    const doc = {
      updateOne: {
        filter: {
          id: key,
        },
        update: {
          $inc: {
            totalVolume: properties.totalVolume,
          },
          $set: {
            lastUpdated: currentDate,
          },
        },
      },
    };

    // Use dot notation to add in aggregates for sales by marketplace
    for (const marketplace of Object.keys(properties.totalSalesByMarketplace)) {
      doc.updateOne.update.$inc['totalSalesByMarketplace.' + marketplace] =
        properties.totalSalesByMarketplace[marketplace];
    }

    documents.push(doc);
  }
}

function createDeleteOneDocuments(sales) {
  const documents = [];

  for (const sale of sales) {
    const doc = {
      deleteOne: {
        filter: {
          _id: sale._id,
        },
      },
    };

    documents.push(doc);
  }

  return documents;
}
