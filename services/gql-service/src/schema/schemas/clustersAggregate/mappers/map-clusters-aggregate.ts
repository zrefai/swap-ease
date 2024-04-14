import { WithId } from 'mongodb';
import { ClustersAggregate as GQLClustersAggregate } from '../../../../__generated__/resolvers-types';
import { mapTotalSalesByMarketplace } from '../../../mappers/map-total-sales-by-marketplace';
import { ClustersAggregate } from 'swap-ease-data';

export function mapClustersAggregate(
  clustersAggregate: WithId<ClustersAggregate>,
): GQLClustersAggregate {
  const { totalSales, totalSalesByMarketplace } = mapTotalSalesByMarketplace(
    clustersAggregate.totalSalesByMarketplace,
  );

  return {
    id: clustersAggregate.id,
    createdAt: clustersAggregate.createdAt,
    updatedAt: clustersAggregate.updatedAt,
    latestSaleBlockNumber: clustersAggregate.latestSaleBlockNumber,
    totalSales,
    totalVolume: clustersAggregate.totalVolume,
    totalSalesByMarketplace,
  };
}
