import { definitions } from "@reservoir0x/reservoir-sdk";

export type EventType = "sale.created" | "sale.updated" | "sale.deleted";
export type ChangedType =
  | "washingTradingScore"
  | "fees.royaltyFeeBps"
  | "fees.marketplaceFeeBps"
  | "fees.royaltyFeeBreakdown"
  | "fees.marketplaceFeeBreakdown"
  | "fees.paidFullRoyalty";

export interface WebsocketSaleResponse {
  event: EventType;
  tags: {
    contract: string;
    maker: string;
    taker: string;
    fillSource: string;
    orderSource: string;
  };
  changed: ChangedType[];
  data: definitions["Model53"];
  offset: string;
  published_at: number;
  type: string;
  status: string;
}
