import { Collection } from 'mongodb';
import { Sale } from '../__generated__/resolvers-types';
import { db } from '../config/db-client';

export class Sales {
  sales: Collection<Sale>;

  constructor() {
    this.sales = db.collection('sales') as Collection<Sale>;
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
}
