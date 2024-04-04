import { Sale } from '@server/models/sale';
import { ChangedType, EventType } from '@server/models/websocket-sale.response';
import { AnyBulkWriteOperation } from 'mongodb';

export function buildSaleOperation(
  eventType: EventType,
  changed: ChangedType[],
  sale: Sale
): AnyBulkWriteOperation<Sale> {
  switch (eventType) {
    case 'sale.created': {
      return createdOpertaion(sale);
    }
    case 'sale.deleted': {
      return deletedOperation(sale);
    }
    case 'sale.updated': {
      return updatedOperation(sale, changed);
    }
  }
}

function createdOpertaion(sale: Sale): AnyBulkWriteOperation<Sale> {
  return {
    insertOne: {
      document: sale,
    },
  };
}

function deletedOperation(sale: Sale): AnyBulkWriteOperation<Sale> {
  return {
    deleteOne: {
      filter: {
        saleId: sale.saleId,
        orderId: sale.orderId,
      },
    },
  };
}

function updatedOperation(
  sale: Sale,
  changed: ChangedType[]
): AnyBulkWriteOperation<Sale> {
  return {
    updateOne: {
      filter: {
        saleId: sale.saleId,
        orderId: sale.orderId,
      },
      update: {
        $set: {
          ...buildUpdateOperation(sale, changed),
        },
      },
    },
  };
}

function buildUpdateOperation(sale: Sale, changed: ChangedType[]) {
  const partialSale: Partial<Sale> = {};

  changed.forEach((type) => {
    switch (type) {
      case 'fees.marketplaceFeeBps': {
        partialSale.markeplaceFeeBps = sale.markeplaceFeeBps;
        return;
      }
      case 'fees.paidFullRoyalty': {
        partialSale.paidFullRoyalty = sale.paidFullRoyalty;
        return;
      }
      case 'fees.royaltyFeeBps': {
        partialSale.royaltyFeeBps = sale.royaltyFeeBps;
        return;
      }
      case 'fees.royaltyFeeBreakdown' || 'fees.marketplaceFeeBreakdown': {
        partialSale.feeBreakdown = sale.feeBreakdown;
      }
    }
  });

  return partialSale;
}
