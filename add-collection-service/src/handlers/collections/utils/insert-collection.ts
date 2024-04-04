import { client } from "@server/config/db-client";
import { Collections } from "@server/data/collections";
import { Tokens } from "@server/data/tokens";
import { Collection } from "@server/models/collection";
import { Token } from "@server/models/token";

export async function insertCollection(
  rankedTokens: Token[],
  collection: Collection,
) {
  const session = client.startSession();
  const collectionsData = new Collections();
  const tokensData = new Tokens();

  try {
    await session.withTransaction(async () => {
      await collectionsData.insertOne(collection, session);
      await tokensData.insertMany(rankedTokens, session);
    });
    console.log("Transaction committed");
  } catch (error) {
    console.error("Transaction failed:", error);

    // Abort the transaction
    session.abortTransaction();
  } finally {
    await session.endSession();
    await client.close();
  }
}
