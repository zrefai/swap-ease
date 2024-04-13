import { SaleByMarketplace } from '@server/__generated__/resolvers-types';

export function mapTotalSalesByMarketplace(salesByMarketplace: {
  [key: string]: number;
}): { totalSales: number; totalSalesByMarketplace: SaleByMarketplace[] } {
  let totalSales = 0;
  const totalSalesByMarketplace: SaleByMarketplace[] = [];

  for (const key of Object.keys(salesByMarketplace)) {
    const value = salesByMarketplace[key];
    totalSales += value;
    totalSalesByMarketplace.push({ marketplace: key, numberOfSales: value });
  }

  return { totalSales, totalSalesByMarketplace };
}
