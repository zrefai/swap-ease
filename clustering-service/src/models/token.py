from dataclasses import dataclass


@dataclass
class Attribute:
    key: str
    value: str
    score: float


@dataclass
class Token:
    tokenId: str
    rank: int
    attributes: list[Attribute]
