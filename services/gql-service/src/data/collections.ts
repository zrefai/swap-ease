import { db } from '../config/db-client';
import { Collection as MongoCollection, ClientSession } from 'mongodb';
import auditModel from './audit-model';
import { Collection } from '../__generated__/resolvers-types';

export class Collections {
  private collections: MongoCollection<Collection>;
  private auditModel;

  constructor() {
    this.collections = db.collection(
      'collections'
    ) as MongoCollection<Collection>;
    this.auditModel = auditModel;
  }

  async insertOne(
    document: Collection,
    session: ClientSession | undefined = undefined
  ) {
    const result = await this.auditModel.insertOne(
      this.collections,
      document,
      session
    );
    return result.insertedId.toString().length > 0;
  }

  async findOne(id: string) {
    return await this.collections.findOne({ id });
  }

  async find() {
    return await this.collections
      .find()
      .sort({ $natural: -1 })
      .limit(20)
      .toArray();
  }
}
