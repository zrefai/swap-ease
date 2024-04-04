from dataclasses import dataclass
import datetime


@dataclass
class ClustersAggregate:
    # ID is the contractAddress
    id: str
    createdAt: datetime.date
    updatedAt: datetime.date
    latestSaleBlockNumber: int
    totalVolume: float
    totalSalesByMarketplace: dict[str, int]
