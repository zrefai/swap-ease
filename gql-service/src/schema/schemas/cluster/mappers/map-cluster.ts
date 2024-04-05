import { WithId } from 'mongodb';
import { Cluster as GQLCLuster } from '../../../../__generated__/resolvers-types';
import { Cluster } from '../../../../models/cluster';
import { mapTotalSalesByMarketplace } from '../../../mappers/map-total-sales-by-marketplace';
import { mapAttributes } from '../../../mappers/map-attributes';

export function mapCluster(cluster: WithId<Cluster>): GQLCLuster {
  const { totalSales, totalSalesByMarketplace } = mapTotalSalesByMarketplace(
    cluster.totalSalesByMarketplace
  );
  const attributes = mapAttributes(cluster.attributes);

  return {
    id: cluster.id,
    contractAddress: cluster.contractAddress,
    createdAt: cluster.createdAt,
    updatedAt: cluster.updatedAt,
    tokenIds: cluster.tokenIds,
    rankAverage: cluster.rankAverage,
    totalSales,
    totalVolume: cluster.totalVolume,
    latestSaleBlockNumber: cluster.latestSaleBlockNumber,
    totalSalesByMarketplace,
    attributes,
  };
}
