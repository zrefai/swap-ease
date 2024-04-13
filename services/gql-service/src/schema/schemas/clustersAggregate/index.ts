import { Resolvers } from '@server/__generated__/resolvers-types';
import { mapClustersAggregate } from './mappers/map-clusters-aggregate';

export const clustersAggregateResovlers: Resolvers = {
  Query: {
    clustersAggregate: async (_parent, { id }, context) => {
      const document = await context.dataSources.clustersAggregates.findOne(id);
      return document ? mapClustersAggregate(document) : null;
    },
  },
};
