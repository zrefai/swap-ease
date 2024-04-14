import { getPaginatedResponse } from '../../../schema/utils/get-paginated-response';
import {
  Resolvers,
  Collection as GQLCollection,
  CollectionsConnection,
} from '../../../__generated__/resolvers-types';
import { mapCollection } from './mappers/map-collection';
import { mapCollectionAttributes } from './mappers/map-collection-attributes';
import { addCollection } from './mutations/add-collection';
import { Collection } from 'swap-ease-data';

export const collectionResolvers: Resolvers = {
  Query: {
    collection: async (_parent, { id }, context) => {
      const document = await context.dataSources.collections.findOne(id);
      return mapCollection(document);
    },
    collections: async (_parent, { pageArgs }, context) =>
      await getPaginatedResponse<
        Collection,
        any,
        GQLCollection,
        CollectionsConnection
      >({
        args: {},
        collection: context.dataSources.collections.collections,
        mapFn: mapCollection,
        pageArgs,
        options: { projection: { attributes: 0 } },
      }),
    collectionAttributes: async (_parent, { id }, context) => {
      const document =
        await context.dataSources.collections.getCollectionAttributes(id);
      return mapCollectionAttributes(document);
    },
  },
  Mutation: {
    addCollection,
  },
};
