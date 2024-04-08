import { AnyBulkWriteOperation, Collection, Db } from 'mongodb';
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

  async salesForCluster(clusterId: string) {
    return await this.sales
      .find({ clusterId })
      .sort({ _id: 1 })
      .limit(20)
      .toArray();
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

  async bulkWrite(operations: AnyBulkWriteOperation<Sale>[]) {
    const response = await this.sales.bulkWrite(operations);
    return response.isOk();
  }
}
