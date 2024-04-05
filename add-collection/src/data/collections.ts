import { Collection as NFTCollection } from "@server/models/collection";
import { Collection as MongoCollection, ClientSession } from "mongodb";
import { db } from "@server/config/db-client";
import auditModel from "./audit-model";

export class Collections {
  private collections: MongoCollection<NFTCollection>;
  private auditModel;

  constructor() {
    this.collections = db.collection(
      "collections",
    ) as MongoCollection<NFTCollection>;
    this.auditModel = auditModel;
  }

  async insertOne(
    document: NFTCollection,
    session: ClientSession | undefined = undefined,
  ) {
    const result = await this.auditModel.insertOne(
      this.collections,
      document,
      session,
    );
    return result.insertedId.toString().length > 0;
  }

  async findOne(contractAddress: string) {
    return await this.collections.findOne({ id: contractAddress });
  }
}
