import { getPaginatedResponse } from '../../utils/get-paginated-response';
import {
  Resolvers,
  Sale as GQLSale,
  SalesConnection,
} from '../../../__generated__/resolvers-types';
import { Sale } from 'swap-ease-data';
import { mapSale } from './mappers/map-sale';
import { mapSalesAnalysis } from './mappers/map-sales-analysis';

export const saleResolvers: Resolvers = {
  Query: {
    salesForToken: async (
      _parent,
      { contractAddress, tokenId, pageArgs },
      context,
    ) =>
      await getPaginatedResponse<Sale, any, GQLSale, SalesConnection>({
        args: { contractAddress, tokenId },
        collection: context.dataSources.sales.sales,
        mapFn: mapSale,
        pageArgs,
      }),
    salesForCluster: async (_parent, { clusterId, pageArgs }, context) =>
      await getPaginatedResponse<Sale, any, GQLSale, SalesConnection>({
        args: { clusterId },
        collection: context.dataSources.sales.sales,
        mapFn: mapSale,
        pageArgs,
      }),
    salesAnalysis: async (_parent, { clusterId }, context) => {
      const documents =
        await context.dataSources.sales.salesForCluster(clusterId);
      return mapSalesAnalysis(documents);
    },
  },
};
