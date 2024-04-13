import { Resolvers } from '@server/__generated__/resolvers-types';
import { mapCluster } from './mappers/map-cluster';

export const clusterResolvers: Resolvers = {
  Query: {
    cluster: async (_parent, { id }, context) => {
      // Maybe add latest sale timestamp to cluster
      const document = await context.dataSources.clusters.findOne(id);
      return document ? mapCluster(document) : null;
    },
    clusters: async (_parent, { contractAddress }, context) => {
      const documents =
        await context.dataSources.clusters.find(contractAddress);
      return documents.map((document) => mapCluster(document));
    },
  },
};
