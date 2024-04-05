import {
  ClientSession,
  Collection,
  InsertOneResult,
  OptionalUnlessRequiredId,
} from 'mongodb';

const insertOne = async <T extends { createdAt: Date; updatedAt: Date }>(
  collection: Collection<T>,
  document: T,
  session: ClientSession | undefined = undefined
): Promise<InsertOneResult<T>> => {
  const currentDate = new Date();
  document.createdAt = currentDate;
  document.updatedAt = currentDate;
  return await collection.insertOne(document as OptionalUnlessRequiredId<T>, {
    session,
  });
};

export default {
  insertOne,
};
