from pprint import pprint
from config.mongoDb import get_db
from models.token import Token
from data.tokens.mapToken import mapToken


class Tokens():
    def __init__(self):
        db = get_db()
        self.collection = db['tokens']

    def getTokensForACollection(self, contractAddress: str) -> list[Token]:
        try:
            # TODO: maybe some validation would be good, where we check count for NFTs for a collection against collection supply in collectionMetadata

            # Find all documents for smartContractAddress, sort them by startIndex to get proper order of documents based on tokenId
            cursor = self.collection.find(
                {'contractAddress': contractAddress})

            if cursor is None:
                raise TypeError(
                    'No NFT documents for {} were found'.format(contractAddress))

            return [mapToken(document) for document in cursor]

        except TypeError as e:
            # TODO: Use a logger here
            pprint(e)
            raise Exception(
                'Cannot continue without CollectionData') from e
