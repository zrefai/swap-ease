import { clusterResolvers } from './schemas/cluster';
import { clustersAggregateResovlers } from './schemas/clustersAggregate';
import { collectionResolvers } from './schemas/collection';
import { saleResolvers } from './schemas/sale';
import { tokenResolvers } from './schemas/token';
import { Scalars } from './scalars';

const resolvers = {
  Query: {
    ...clusterResolvers.Query,
    ...clustersAggregateResovlers.Query,
    ...collectionResolvers.Query,
    ...saleResolvers.Query,
    ...tokenResolvers.Query,
  },
  Mutations: {
    ...collectionResolvers.Mutation,
  },
  ...Scalars,
};

export default resolvers;
