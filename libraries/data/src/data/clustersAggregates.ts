import { Collection, Db } from 'mongodb';
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
}
