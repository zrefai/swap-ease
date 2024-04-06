import { Audit } from './audit';

export interface Cluster extends Audit {
  id: string;
  contractAddress: string;
  tokenIds: string[];
  rankAverage?: number;
  totalVolume?: number;
  totalSalesByMarketplace: { [key: string]: number };
  latestSaleBlockNumber: number;
  attributes: { [key: string]: { [key: string]: number } };
}
