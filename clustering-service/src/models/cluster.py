from dataclasses import dataclass
import datetime
from typing import Optional

@dataclass
class Cluster:
    id: str
    contractAddress: str
    createdAt: datetime.date
    updatedAt: datetime.date
    tokenIds: list[str]
    rankAverage: Optional[float] = None
    totalVolume: Optional[float] = None
    totalSalesByMarketplace: Optional[dict[str, float]] = None
    latestSaleBlockNumber: Optional[int] = None
    attributes: Optional[dict[str, dict[str, int]]] = None
