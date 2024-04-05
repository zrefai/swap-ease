from dataclasses import dataclass
import datetime
from typing import Optional


@dataclass
class Currency:
    contract: str
    name: str
    symbol: str
    decimals: int


@dataclass
class Amount:
    raw: str
    decimal: float
    usd: float
    native: float


@dataclass
class Price:
    currency: Currency
    amount: Amount
    netAmount: Optional[Amount] = None


@dataclass
class FeeBreakdown:
    kind: str
    bps: int
    recipient: str
    source: str
    rawAmount: str


@dataclass
class Sale:
    # ID for sale in Reservoir API
    saleId: str
    # ID for order in Reservoir API
    orderId: str
    # ID added to sale if sale was backfilled during clustering process
    batchId: str
    # Txn hash from the block it was mined in
    txHash: str
    # The block number the sale occurred in
    block: int
    # Time, in unix, when the order occurred
    timestamp: datetime.date
    # Contract address for the collection of NFTs the sale occurred for
    contractAddress: str
    # The token within the collection of NFTs the sale occurred for
    tokenId: str
    # The domain that the order occurred in (i.e blur.io or opensea)
    orderSource: str
    # The contract that fulfilled the order (i.e blur-v2 or wyvren)
    orderKind: str
    # The domain that filled the order
    fillSource: str
    # Address that the token came from
    fromAddress: str
    # Address that the token is going to
    toAddress: str
    # Price the sale took place for
    price: Price
    # Whether all royalties were paid
    paidFullRoyalty: bool
    createdAt: str
    updatedAt: str
    # ID for the cluster the sale belongs in
    clusterId: Optional[str] = None
    royaltyFeeBps: Optional[int] = None
    marketplaceFeeBps: Optional[int] = None
    # Breakdown of royalty fees
    feeBreakdown: Optional[list[FeeBreakdown]] = None
