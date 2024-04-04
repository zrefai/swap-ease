import { db } from '@server/config/db-client';
import { Cluster } from '@server/models/cluster';
import { Collection } from 'mongodb';

export class Clusters {
  private clusters: Collection<Cluster>;

  constructor() {
    this.clusters = db.collection('clusters') as Collection<Cluster>;
  }

  async getClusterDataForCache(
    contractAddress: string | undefined = undefined
  ) {
    const clusters = await this.clusters
      .find(contractAddress ? { contractAddress } : {}, {
        projection: { id: 1, contractAddress: 1, tokenIds: 1 },
      })
      .toArray();

    return clusters;
  }
}
