import { Collection } from 'mongodb';
import { db } from '../config/db-client';
import { Cluster } from '../models/cluster';

export class Clusters {
  private clusters: Collection<Cluster>;

  constructor() {
    this.clusters = db.collection('clusters') as Collection<Cluster>;
  }

  async findOne(id: string) {
    return await this.clusters.findOne({ id });
  }

  async find(contractAddress: string) {
    return await this.clusters.find({ contractAddress }).toArray();
  }
}
