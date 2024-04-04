import {
  ClientSession,
  Collection,
  InsertOneResult,
  OptionalUnlessRequiredId,
} from "mongodb";

export interface AuditModel {
  createdAt?: Date;
  updatedAt?: Date;
}

const insertOne = async <T extends AuditModel>(
  collection: Collection<T>,
  document: T,
  session: ClientSession | undefined = undefined,
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
