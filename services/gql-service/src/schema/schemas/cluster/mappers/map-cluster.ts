import { WithId } from 'mongodb';
import { Cluster as GQLCLuster } from '@server/__generated__/resolvers-types';
import { mapTotalSalesByMarketplace } from '@server/schema/mappers/map-total-sales-by-marketplace';
import { mapAttributes } from '@server/schema/mappers/map-attributes';
import { Cluster } from 'swap-ease-data';

export function mapCluster(cluster: WithId<Cluster>): GQLCLuster {
  const { totalSales, totalSalesByMarketplace } = mapTotalSalesByMarketplace(
    cluster.totalSalesByMarketplace,
  );
  const attributes = mapAttributes(cluster.attributes);

  return {
    id: cluster.id,
    contractAddress: cluster.contractAddress,
    createdAt: cluster.createdAt,
    updatedAt: cluster.updatedAt,
    tokenIds: cluster.tokenIds,
    rankAverage: cluster.rankAverage,
    totalVolume: cluster.totalVolume,
    latestSaleBlockNumber: cluster.latestSaleBlockNumber,
    totalSales,
    attributes,
    totalSalesByMarketplace,
  };
}
