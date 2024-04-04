import { db } from "@server/config/db-client";
import { Collection as MongoCollection, ClientSession } from "mongodb";
import { Token } from "@server/models/token";

export class Tokens {
  private tokens: MongoCollection<Token>;

  constructor() {
    this.tokens = db.collection("tokens") as MongoCollection<Token>;
  }

  async insertMany(
    documents: Token[],
    session: ClientSession | undefined = undefined,
  ): Promise<boolean> {
    const result = await this.tokens.insertMany(documents, { session });
    return Object.keys(result.insertedIds).length === documents.length;
  }
}
