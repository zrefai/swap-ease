import { definitions } from '@reservoir0x/reservoir-sdk';
import { clustersCache } from '@server/index';
import {
  Amount,
  Currency,
  FeeBreakdown,
  Price,
  Sale,
} from '@server/models/sale';
import { WebsocketSaleResponse } from '@server/models/websocket-sale.response';
import assert from 'assert';

export function mapSale(response: WebsocketSaleResponse): Sale {
  const sale = response.data;

  const saleId = sale.saleId;
  assert(saleId, 'SaleId was not in the response');

  const orderId = sale.orderId;
  assert(orderId, 'OrderId was not in the response');

  const txHash = sale.txHash;
  assert(txHash, 'TxHash was not in the response');

  const block = sale.block;
  assert(block, 'Block was not in the response');

  const timestamp = sale.timestamp;
  assert(timestamp, 'Timestamp was not in the response');

  const contractAddress = sale.token?.contract;
  assert(contractAddress, 'Contract address was not in the response');

  const tokenId = sale.token?.tokenId;
  assert(tokenId, 'TokenId was not in the response');

  const orderSource = sale.orderSource;
  assert(orderSource, 'Order source was not in the response');

  const orderKind = sale.orderKind;
  assert(orderKind, 'Order kind was not in the response');

  const fillSource = sale.fillSource;
  assert(fillSource, 'Fill source was not in the response');

  const fromAddress = sale.from;
  assert(fromAddress, 'From address was not in the response');

  const toAddress = sale.to;
  assert(toAddress, 'To address kind was not in the response');

  const clusterId = clustersCache.getClusterId(contractAddress, tokenId);
  assert(
    clusterId,
    `Could not retrieve clusterId for token: \n\tcontractAddress:${contractAddress}\n\ttokenId:${tokenId}`
  );

  return {
    saleId,
    orderId,
    txHash,
    block,
    timestamp,
    contractAddress,
    tokenId,
    orderSource,
    orderKind,
    fillSource,
    fromAddress,
    toAddress,
    price: mapPrice(sale.price),
    clusterId,
    royaltyFeeBps: sale.royaltyFeeBps,
    markeplaceFeeBps: sale.marketplaceFeeBps,
    paidFullRoyalty: sale.paidFullRoyalty,
    createdAt: sale.createdAt,
    updatedAt: sale.updatedAt,
    feeBreakdown: mapFeeBreakdown(sale.feeBreakdown),
  };
}

function mapPrice(price?: definitions['price']): Price {
  return {
    currency: mapCurrency(price?.currency),
    amount: mapAmount(price?.amount),
    netAmount: mapAmount(price?.netAmount),
  };
}

function mapAmount(amount?: definitions['amount']): Amount {
  const raw = amount?.raw;
  assert(raw, 'Raw was not available in the response');

  const decimal = amount?.decimal;
  assert(decimal, 'Decimal was not available in the response');

  return {
    raw,
    decimal,
    usd: amount?.usd,
  };
}

function mapCurrency(currency?: definitions['currency']): Currency {
  const contract = currency?.contract;
  assert(contract, 'Contract was not in the response');
  return {
    contract,
    name: currency?.name,
    symbol: currency?.symbol,
    decimals: currency?.decimals,
  };
}

function mapFeeBreakdown(
  feeBreakdown?: definitions['Model52']
): FeeBreakdown[] | undefined {
  return feeBreakdown?.map((fee) => ({
    kind: fee.kind,
    bps: fee.bps,
    recipient: fee.recipient,
    source: fee.source,
    rawAmount: fee.rawAmount,
  }));
}
