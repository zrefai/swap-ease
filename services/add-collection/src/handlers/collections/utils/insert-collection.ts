import { client, db } from '@config/db-client';
import { Collection, Collections, Token, Tokens } from 'swap-ease-data';

export async function insertCollection(
  rankedTokens: Token[],
  collection: Collection,
) {
  const session = client.startSession();
  const collectionsData = new Collections(db);
  const tokensData = new Tokens(db);

  try {
    await session.withTransaction(async () => {
      await collectionsData.insertOne(collection, session);
      await tokensData.insertMany(rankedTokens, session);
    });
    console.log('Transaction committed');
  } catch (error) {
    console.error('Transaction failed:', error);

    // Abort the transaction
    session.abortTransaction();
  } finally {
    await session.endSession();
    await client.close();
  }
}
