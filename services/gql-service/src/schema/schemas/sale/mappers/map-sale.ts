import { WithId } from 'mongodb';
import { Sale } from 'swap-ease-data';
import { Sale as GQLSale } from '@server/__generated__/resolvers-types';

export function mapSale(sale: WithId<Sale>): GQLSale {
  return {
    saleId: sale.saleId,
    orderId: sale.orderId,
    txHash: sale.txHash,
    block: sale.block,
    timestamp: sale.timestamp,
    contractAddress: sale.contractAddress,
    tokenId: sale.tokenId,
    orderSource: sale.orderSource,
    fillSource: sale.fillSource,
    fromAddress: sale.fromAddress,
    toAddress: sale.toAddress,
    clusterId: sale.clusterId,
    createdAt: sale.createdAt ? new Date(sale.createdAt) : null,
    updatedAt: sale.updatedAt ? new Date(sale.updatedAt) : null,
    paidFullRoyalty: sale.paidFullRoyalty,
    royaltyFeeBps: sale.royaltyFeeBps,
    marketplaceFeeBps: sale.markeplaceFeeBps,
    price: sale.price,
    feeBreakdown: sale.feeBreakdown.map((fee) => ({
      bps: fee.bps,
      kind: fee.kind,
      rawAmount: fee.rawAmount,
      recipient: fee.recipient,
      source: fee.source,
    })),
  };
}
