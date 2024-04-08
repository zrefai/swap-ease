import { AnyBulkWriteOperation, ClientSession, Collection, Db } from 'mongodb';
import { ClustersAggregate } from '../models/clusters-aggregate';
import { CLUSTERSAGGREGATES } from '.';

export class ClustersAggregates {
  private clustersAggregates: Collection<ClustersAggregate>;

  constructor(db: Db) {
    this.clustersAggregates = db.collection(
      CLUSTERSAGGREGATES,
    ) as Collection<ClustersAggregate>;
  }

  async findOne(id: string) {
    return await this.clustersAggregates.findOne({ id });
  }

  /**
   * Bulk write the given operations and seesion. Operations are typed using the ClustersAggregates model. USE ONLY FOR ATLAS API FUNCTIONS, since bulkWrite in Atlas API env returns Promise<null>.
   * @param operations Operations to perform on the ClustersAggregate DB.
   * @param session Session for a transaction.
   * @returns null
   */
  async bulkWrite(
    operations: AnyBulkWriteOperation<ClustersAggregate>[],
    session: ClientSession | undefined = undefined,
  ) {
    return await this.clustersAggregates.bulkWrite(operations, {
      session,
    });
  }
}
