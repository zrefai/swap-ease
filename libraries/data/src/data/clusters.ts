import { Collection, Db } from 'mongodb';
import { Cluster } from '../models/cluster';
import { CLUSTERS } from '.';

export class Clusters {
  private clusters: Collection<Cluster>;

  constructor(db: Db) {
    this.clusters = db.collection(CLUSTERS) as Collection<Cluster>;
  }

  async findOne(id: string) {
    return await this.clusters.findOne({ id });
  }

  async find(contractAddress: string) {
    return await this.clusters.find({ contractAddress }).toArray();
  }

  async getClusterDataForCache(
    contractAddress: string | undefined = undefined,
  ) {
    const clusters = await this.clusters
      .find(contractAddress ? { contractAddress } : {}, {
        projection: { id: 1, contractAddress: 1, tokenIds: 1 },
      })
      .toArray();

    return clusters;
  }
}
