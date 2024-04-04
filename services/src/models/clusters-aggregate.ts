export interface ClustersAggregate {
  id: string;
  createdAt: string;
  updatedAt: string;
  latestSaleBlockNumber: number;
  totalVolume: number;
  totalSalesByMarketplace: { [key: string]: number };
}
