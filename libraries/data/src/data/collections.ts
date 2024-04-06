import { Collection as MongoCollection, ClientSession, Db } from 'mongodb';
import { insertOne } from './audit';
import { Collection } from '../models/collection';
import { COLLECTIONS } from '.';

export class Collections {
  private collections: MongoCollection<Collection>;

  constructor(db: Db) {
    this.collections = db.collection(
      COLLECTIONS,
    ) as MongoCollection<Collection>;
  }

  async insertOne(
    document: Collection,
    session: ClientSession | undefined = undefined,
  ) {
    const result = await insertOne(this.collections, document, session);
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
