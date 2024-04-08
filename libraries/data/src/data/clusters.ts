import { AnyBulkWriteOperation, ClientSession, Collection, Db } from 'mongodb';
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

  /**
   * Bulk write the given operations and seesion. Operations are typed using the Cluster model. USE ONLY FOR ATLAS API FUNCTIONS, since bulkWrite in Atlas API env returns Promise<null>.
   * @param operations Operations to perform on the Cluster DB.
   * @param session Session for a transaction.
   * @returns null
   */
  async bulkWrite(
    operations: AnyBulkWriteOperation<Cluster>[],
    session: ClientSession | undefined = undefined,
  ) {
    return await this.clusters.bulkWrite(operations, { session });
  }
}
