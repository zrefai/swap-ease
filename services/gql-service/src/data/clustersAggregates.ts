import { Collection } from 'mongodb';
import { db } from '../config/db-client';
import { ClustersAggregate } from '../models/clusters-aggregate';

export class ClustersAggregates {
  private clustersAggregates: Collection<ClustersAggregate>;

  constructor() {
    this.clustersAggregates = db.collection(
      'clustersAggregates' // This collection name needs to change to clustersAggregates
    ) as Collection<ClustersAggregate>;
  }

  async findOne(id: string) {
    return await this.clustersAggregates.findOne({ id });
  }
}
