import { getPaginatedResponse } from '../../../schema/utils/get-paginated-response';
import {
  Resolvers,
  Collection as GQLCollection,
  CollectionsConnection,
} from '../../../__generated__/resolvers-types';
import { mapCollection } from './mappers/map-collection';
import { mapCollectionAttributes } from './mappers/map-collection-attributes';
import { Collection } from 'swap-ease-data';
import { produce } from '@config/rabbit-mq-client';

export const collectionResolvers: Resolvers = {
  Query: {
    collection: async (_parent, { id }, context) => {
      const document = await context.dataSources.collections.findOne(id);
      return document ? mapCollection(document) : null;
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
        pageArgs: pageArgs ?? undefined,
        options: { projection: { attributes: 0 } },
      }),
    collectionAttributes: async (_parent, { id }, context) => {
      const document =
        await context.dataSources.collections.getCollectionAttributes(id);
      return document ? mapCollectionAttributes(document) : null;
    },
  },
  Mutation: {
    addCollection: async (_parent, { contractAddress }) => {
      // Need to add separate collection to track contract addresses that were just entered
      const result = await produce(contractAddress);

      if (result) {
        return {
          code: 200,
          message: 'Successfully posted to message to MQ',
          success: true,
        };
      }

      return {
        code: 500,
        message: 'Could not send message to MQ',
        success: false,
      };
    },
  },
};
