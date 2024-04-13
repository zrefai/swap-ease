export interface Sale {
  saleId: string;
  orderId: string;
  txHash: string;
  block: number;
  timestamp: number;
  contractAddress: string;
  tokenId: string;
  orderSource: string;
  orderKind: string;
  fillSource: string;
  fromAddress: string;
  toAddress: string;
  price: Price;
  clusterId: string;
  paidFullRoyalty?: boolean;
  createdAt?: string;
  updatedAt?: string;
  royaltyFeeBps?: number;
  markeplaceFeeBps?: number;
  feeBreakdown: FeeBreakdown[];
}

export interface Currency {
  contract: string;
  name?: string;
  symbol?: string;
  decimals?: number;
}

export interface Amount {
  raw: string;
  decimal: number;
  usd?: number;
  native?: number;
}

export interface Price {
  currency: Currency;
  amount: Amount;
  netAmount?: Amount;
}

export interface FeeBreakdown {
  kind?: 'royalty' | 'marketplace';
  bps?: number;
  recipient?: string;
  source?: string;
  rawAmount?: string;
}
