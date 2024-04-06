import { Resolvers } from '../../../__generated__/resolvers-types';
import { mapCollection } from './mappers/map-collection';
import { addCollection } from './mutations/add-collection';

export const collectionResolvers: Resolvers = {
  Query: {
    collection: async (_parent, { id }, context) => {
      const document = await context.dataSources.collections.findOne(id);
      return mapCollection(document);
    },
    collections: async (_parent, _params, context) => {
      const documents = await context.dataSources.collections.find();
      return documents.map((document) => mapCollection(document));
    },
  },
  Mutation: {
    addCollection,
  },
};
