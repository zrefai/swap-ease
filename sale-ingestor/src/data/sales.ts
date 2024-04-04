import { db } from '@server/config/db-client';
import { Sale } from '@server/models/sale';
import { AnyBulkWriteOperation, Collection } from 'mongodb';

export class Sales {
  private sales: Collection<Sale>;

  constructor() {
    this.sales = db.collection('sales') as Collection<Sale>;
  }

  async bulkWrite(operations: AnyBulkWriteOperation<Sale>[]) {
    const response = await this.sales.bulkWrite(operations);
    return response.isOk();
  }
}
