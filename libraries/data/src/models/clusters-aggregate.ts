import { Audit } from './audit';

export interface ClustersAggregate extends Audit {
  id: string;
  latestSaleBlockNumber: number;
  totalVolume: number;
  totalSalesByMarketplace: { [key: string]: number };
}
