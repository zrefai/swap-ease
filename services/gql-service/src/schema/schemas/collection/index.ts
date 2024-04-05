import { Resolvers } from '../../../__generated__/resolvers-types';
import { addCollection } from './mutations/add-collection';

export const collectionResolvers: Resolvers = {
  Query: {
    collection: async (_parent, { id }, context) =>
      await context.dataSources.collections.findOne(id),
    collections: async (_parent, _params, context) =>
      await context.dataSources.collections.find(),
  },
  Mutation: {
    addCollection,
  },
};
