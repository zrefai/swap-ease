from datetime import datetime
import uuid
from models.sale import Sale, FeeBreakdown, Price, Amount, Currency
from apis.reservoir.salesDataClasses import GetSalesResponse


def mapGetSalesResponse(response) -> GetSalesResponse:
    sales: list[Sale] = []

    # Attach batchId to the sale so that DB trigger doesnt run against backfilled sales
    batchId = str(uuid.uuid4())

    for sale in response['sales']:
        if sale['isDeleted'] == False:
            sales.append(Sale(
                saleId=sale['saleId'],
                orderId=sale['orderId'],
                batchId=batchId,
                txHash=sale['txHash'],
                block=sale['block'],
                timestamp=datetime.utcfromtimestamp(sale['timestamp']),
                contractAddress=sale['token']['contract'],
                tokenId=sale['token']['tokenId'],
                orderSource=sale['orderSource'],
                orderKind=sale['orderKind'],
                fillSource=sale['fillSource'],
                fromAddress=sale['from'],
                toAddress=sale['to'],
                price=mapPrice(sale['price']),
                royaltyFeeBps=sale['royaltyFeeBps'] if 'royaltyFeeBps' in sale else None,
                marketplaceFeeBps=sale['marketplaceFeeBps'] if 'marketplaceFeeBps' in sale else None,
                paidFullRoyalty=sale['paidFullRoyalty'] if 'paidFullRoyalty' in sale else None,
                feeBreakdown=mapFeeBreakdown(
                    sale['feeBreakdown']) if 'feeBreakdown' in sale else None,
                createdAt=sale['createdAt'],
                updatedAt=sale['updatedAt']
            ))

    return GetSalesResponse(
        sales=sales,
        continuation=response['continuation'] if 'continuation' in response else None
    )


def mapPrice(price) -> Price:
    return Price(
        currency=mapCurrency(price['currency']),
        amount=mapAmount(price['amount']),
        netAmount=mapAmount(
            price['netAmount']) if 'netAmount' in price else None
    )


def mapCurrency(currency) -> Currency:
    return Currency(
        contract=currency['contract'],
        name=currency['name'],
        symbol=currency['symbol'],
        decimals=currency['decimals'],
    )


def mapAmount(amount) -> Amount:
    return Amount(
        raw=amount['raw'],
        decimal=amount['decimal'],
        usd=amount['usd'],
        native=amount['native']
    )


def mapFeeBreakdown(feeBreakdown) -> list[FeeBreakdown]:
    fees = []

    for fee in feeBreakdown:
        newFee = FeeBreakdown(
            kind=fee['kind'],
            bps=fee['bps'],
            recipient=fee['recipient'],
            source=fee['source'] if 'source' in fee else None,
            rawAmount=fee['rawAmount']
        )
        fees.append(newFee)

    return fees
