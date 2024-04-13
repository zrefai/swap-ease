import { AnyBulkWriteOperation, ClientSession, Collection, Db } from 'mongodb';
import { Sale } from '../models/sale';
import { SALES } from '.';

export class Sales {
  sales: Collection<Sale>;

  constructor(db: Db) {
    this.sales = db.collection(SALES) as Collection<Sale>;
  }

  async salesForToken(contractAddress: string, tokenId: string) {
    return await this.sales.find({ contractAddress, tokenId }).toArray();
  }

  async getSalesLessThanDate(date: Date) {
    return await this.sales
      .aggregate([
        {
          $match: {
            timestamp: {
              $lt: date,
            },
          },
        },
      ])
      .toArray();
  }

  async salesForCluster(clusterId: string) {
    return await this.sales
      .find(
        { clusterId },
        {
          projection: {
            block: 1,
            timestamp: 1,
            fillSource: 1,
            price: 1,
            feeBreakdown: 1,
          },
        },
      )
      .sort({ _id: 1 })
      .toArray();
  }

  /**
   * Bulk write the given operations and seesion. Operations are typed using the Sales model. USE ONLY FOR ATLAS API FUNCTIONS, since bulkWrite in Atlas API env returns Promise<null>.
   * @param operations Operations to perform on the Sales DB.
   * @param session Session for a transaction.
   * @returns null
   */
  async bulkWrite(
    operations: AnyBulkWriteOperation<Sale>[],
    session: ClientSession | undefined = undefined,
  ) {
    return await this.sales.bulkWrite(operations, { session });
  }
}
