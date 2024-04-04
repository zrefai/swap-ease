import { getPaginatedResponse } from '../../../schema/utils/get-paginated-response';
import {
  Resolvers,
  Sale,
  SalesConnection,
} from '../../../__generated__/resolvers-types';

export const saleResolvers: Resolvers = {
  Query: {
    salesForToken: async (
      _parent,
      { contractAddress, tokenId, pageArgs },
      context
    ) =>
      await getPaginatedResponse<Sale, any, SalesConnection>(
        { contractAddress, tokenId },
        context.dataSources.sales.sales,
        (doc) => doc as Sale,
        pageArgs
      ),
    salesForCluster: async (_parent, { clusterId, pageArgs }, context) =>
      await getPaginatedResponse<Sale, any, SalesConnection>(
        { clusterId },
        context.dataSources.sales.sales,
        (doc) => doc as Sale,
        pageArgs
      ),
  },
};
