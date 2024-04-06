import { getPaginatedResponse } from '../../utils/get-paginated-response';
import {
  Resolvers,
  Sale as GQLSale,
  SalesConnection,
} from '../../../__generated__/resolvers-types';
import { Sale } from 'swap-ease-data';
import { mapSale } from './mappers/map-sale';

export const saleResolvers: Resolvers = {
  Query: {
    salesForToken: async (
      _parent,
      { contractAddress, tokenId, pageArgs },
      context
    ) =>
      await getPaginatedResponse<Sale, any, GQLSale, SalesConnection>(
        { contractAddress, tokenId },
        context.dataSources.sales.sales,
        mapSale,
        pageArgs
      ),
    salesForCluster: async (_parent, { clusterId, pageArgs }, context) =>
      await getPaginatedResponse<Sale, any, GQLSale, SalesConnection>(
        { clusterId },
        context.dataSources.sales.sales,
        mapSale,
        pageArgs
      ),
  },
};
