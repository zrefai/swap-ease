from dataclasses import dataclass
from typing import Optional
from models.sale import Sale


@dataclass
class GetSalesResponse:
    sales: list[Sale]
    continuation: Optional[str] = None
