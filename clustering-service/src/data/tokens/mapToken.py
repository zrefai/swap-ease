from models.token import Token, Attribute


def mapToken(document) -> Token:
    attributes = [mapAttribute(a) for a in document['attributes']]
    return Token(
        tokenId=document['tokenId'],
        rank=document['rank'],
        attributes=attributes
    )


def mapAttribute(a) -> Attribute:
    return Attribute(
        key=a['key'],
        value=a['value'],
        score=a['score']
    )
