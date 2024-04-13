import { WithId } from 'mongodb';
import { Sale } from 'swap-ease-data';
import { formatEther, getBigInt } from 'ethers';
import {
  SalesAnalysis,
  SalesScatterEdge,
} from '@server/__generated__/resolvers-types';

const BPS_VALUE = 0.01;

export function mapSalesAnalysis(sales: WithId<Sale>[]): SalesAnalysis {
  if (sales.length === 0) {
    return {
      edges: [],
      salesCount: 0,
      native: {},
      usd: {},
    };
  }
  const map: {
    [key: string]: SalesScatterEdge;
  } = {};

  let salesCount = 0;
  // USD stats for all sales
  const pricesUsd = [];
  let volumeUsd = 0;
  let totalRoyaltyFeesUsd = 0;
  let totalMarketplaceFeesUsd = 0;
  let lowestUsd = Infinity;
  let highestUsd = -Infinity;
  // Native stats for all sales
  const pricesNative = [];
  let volumeNative = 0;
  let totalRoyaltyFeesNative = 0;
  let totalMarketplaceFeesNative = 0;
  let lowestNative = Infinity;
  let highestNative = -Infinity;

  // Group sales by fillSource
  for (const sale of sales) {
    const currencySymbol = sale.price.currency.symbol;

    if (
      currencySymbol &&
      (currencySymbol === 'WETH' || currencySymbol === 'ETH')
    ) {
      const native = sale.price.amount.native;
      const usd = sale.price.amount.usd;

      const scatterPoint = {
        usd,
        native,
        blockNumber: sale.block,
        timestamp: sale.timestamp,
      };

      salesCount++;

      // USD stats for all sales
      pricesUsd.push(usd);
      volumeUsd += usd;
      lowestUsd = Math.min(lowestUsd, usd);
      highestUsd = Math.max(highestUsd, usd);
      // Native stats for all sales
      pricesNative.push(native);
      volumeNative += native;
      lowestNative = Math.min(lowestNative, native);
      highestNative = Math.max(highestNative, native);

      // Fees USD
      let royaltyFeesUsd = 0;
      let marketplaceFeesUsd = 0;
      // Fees Native
      let royaltyFeesNative = 0;
      let marketplaceFeesNative = 0;
      for (const fee of sale.feeBreakdown) {
        if (fee.kind && fee.rawAmount && fee.bps !== undefined) {
          const bps = (fee.bps * BPS_VALUE) / 100;
          const rawAmountInUsd = sale.price.amount.usd * bps;
          const rawAmountInNative = parseFloat(
            formatEther(getBigInt(fee.rawAmount)),
          );

          if (fee.kind === 'royalty') {
            // Fees USD
            royaltyFeesUsd += rawAmountInUsd;
            totalRoyaltyFeesUsd += rawAmountInUsd;
            // Fees Native
            royaltyFeesNative += rawAmountInNative;
            totalRoyaltyFeesNative += rawAmountInNative;
          }

          if (fee.kind === 'marketplace') {
            // Fees USD
            marketplaceFeesUsd += rawAmountInUsd;
            totalMarketplaceFeesUsd += rawAmountInUsd;
            // Fees Native
            marketplaceFeesNative += rawAmountInNative;
            totalMarketplaceFeesNative += rawAmountInNative;
          }
        }
      }

      const fillSource = sale.fillSource;

      if (fillSource in map) {
        const object = map[fillSource];
        object.salesCount += 1;
        object.points.push(scatterPoint);
        // Fees USD
        object.usd.volume += usd;
        object.usd.lowest = Math.min(object.usd.lowest, usd);
        object.usd.highest = Math.max(object.usd.highest, usd);
        object.usd.royaltyFeeVolume += royaltyFeesUsd;
        object.usd.marketplaceFeeVolume += marketplaceFeesUsd;
        // Fees Native
        object.usd.volume += native;
        object.native.lowest = Math.min(object.native.lowest, usd);
        object.native.highest = Math.max(object.native.highest, usd);
        object.native.royaltyFeeVolume += royaltyFeesNative;
        object.native.marketplaceFeeVolume += marketplaceFeesNative;
      } else {
        map[fillSource] = {
          name: fillSource.replace(/\*/g, '.'),
          points: [scatterPoint],
          salesCount: 1,
          usd: {
            volume: usd,
            lowest: usd,
            highest: usd,
            royaltyFeeVolume: royaltyFeesUsd,
            marketplaceFeeVolume: marketplaceFeesUsd,
          },
          native: {
            volume: native,
            lowest: native,
            highest: native,
            royaltyFeeVolume: royaltyFeesNative,
            marketplaceFeeVolume: marketplaceFeesNative,
          },
        };
      }
    }
  }

  // Calculate average
  Object.values(map).forEach((object) => {
    object.usd.average = object.usd.volume / object.salesCount;
    object.native.average = object.usd.volume / object.salesCount;
  });

  return {
    edges: Object.values(map).map((object) => object),
    salesCount,
    usd: {
      average: volumeUsd / salesCount,
      volume: volumeUsd,
      lowest: lowestUsd,
      highest: highestUsd,
      royaltyFeeVolume: totalRoyaltyFeesUsd,
      marketplaceFeeVolume: totalMarketplaceFeesUsd,
    },
    native: {
      average: volumeNative / salesCount,
      volume: volumeNative,
      lowest: lowestNative,
      highest: highestNative,
      royaltyFeeVolume: totalRoyaltyFeesNative,
      marketplaceFeeVolume: totalMarketplaceFeesNative,
    },
  };
}
