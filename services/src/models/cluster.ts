export interface Cluster {
  id: string;
  contractAddress: string;
  createdAt?: string;
  updatedAt?: string;
  tokenIds: string[];
  rankAverage?: number;
  totalVolume?: number;
  totalSalesByMarketplace: { [key: string]: number };
  latestSaleBlockNumber: number;
  attributes: { [key: string]: { [key: string]: number } };
}
