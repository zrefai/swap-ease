import { WithId } from 'mongodb';
import ss from 'simple-statistics';
import { Sale, SourceSpecialChar } from 'swap-ease-data';
import { formatEther, getBigInt } from 'ethers';
import {
  SalesAnalysis,
  SalesScatterEdge,
} from '../../../../__generated__/resolvers-types';

const BPS_VALUE = 0.01;

export function mapSalesAnalysis(sales: WithId<Sale>[]): SalesAnalysis {
  if (sales.length === 0) {
    return {
      edges: [],
      native: {},
      usd: {},
    };
  }
  const map: {
    [key: string]: {
      pricesUsd: number[];
      pricesNative: number[];
      edge: SalesScatterEdge;
    };
  } = {};

  let salesCount = 0;
  // USD stats for all sales
  const pricesUsd = [];
  let totalRoyaltyFeesUsd = 0;
  let totalMarketplaceFeesUsd = 0;
  // Native stats for all sales
  const pricesNative = [];
  let totalRoyaltyFeesNative = 0;
  let totalMarketplaceFeesNative = 0;

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
      // Native stats for all sales
      pricesNative.push(native);

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
        object.pricesUsd.push(usd);
        object.pricesNative.push(native);
        object.edge.points.push(scatterPoint);
        // Fees USD
        object.edge.usd.royaltyFeeVolume += royaltyFeesUsd;
        object.edge.usd.marketplaceFeeVolume += marketplaceFeesUsd;
        // Fees Native
        object.edge.native.royaltyFeeVolume += royaltyFeesNative;
        object.edge.native.marketplaceFeeVolume += marketplaceFeesNative;
      } else {
        map[fillSource] = {
          pricesUsd: [usd],
          pricesNative: [native],
          edge: {
            name: fillSource.replace(SourceSpecialChar, '.'),
            points: [scatterPoint],
            usd: {
              royaltyFeeVolume: royaltyFeesUsd,
              marketplaceFeeVolume: marketplaceFeesUsd,
            },
            native: {
              royaltyFeeVolume: royaltyFeesNative,
              marketplaceFeeVolume: marketplaceFeesNative,
            },
          },
        };
      }
    }
  }

  Object.values(map).forEach((object) => {
    object.edge.usd = {
      ...generateStatsForSales(object.pricesUsd),
      ...object.edge.usd,
    };

    object.edge.native = {
      ...generateStatsForSales(object.pricesNative),
      ...object.edge.native,
    };
  });

  return {
    edges: Object.values(map).map((object) => object.edge),
    usd: {
      ...generateStatsForSales(pricesUsd),
      royaltyFeeVolume: totalRoyaltyFeesUsd,
      marketplaceFeeVolume: totalMarketplaceFeesUsd,
    },
    native: {
      ...generateStatsForSales(pricesNative),
      royaltyFeeVolume: totalRoyaltyFeesNative,
      marketplaceFeeVolume: totalMarketplaceFeesNative,
    },
  };
}

function generateStatsForSales(sales: number[]) {
  const salesCount = sales.length;
  const average = parseFloat(ss.average(sales).toFixed(3));
  const volume = ss.sum(sales);
  const lowest = ss.min(sales);
  const highest = ss.max(sales);
  const standardDeviation = parseFloat(ss.standardDeviation(sales).toFixed(3));

  return {
    salesCount,
    average,
    volume,
    lowest,
    highest,
    standardDeviation,
  };
}
