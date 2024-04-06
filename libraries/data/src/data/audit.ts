import {
  ClientSession,
  Collection,
  InsertOneResult,
  OptionalUnlessRequiredId,
} from 'mongodb';
import { Audit } from '../models';

export async function insertOne<T extends Audit>(
  collection: Collection<T>,
  document: T,
  session: ClientSession | undefined = undefined,
): Promise<InsertOneResult<T>> {
  const currentDate = new Date();
  document.createdAt = currentDate;
  document.updatedAt = currentDate;
  return await collection.insertOne(document as OptionalUnlessRequiredId<T>, {
    session,
  });
}
