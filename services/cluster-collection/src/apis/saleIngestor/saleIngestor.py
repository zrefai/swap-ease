import requests
from pprint import pprint
from helpers.getEnvVariables import getEnvVariables


class SaleIngestor:
    def __init__(self) -> None:
        self.envVariables = getEnvVariables()
    
    def callCacheCollection(self, contractAddress: str) -> bool:
        url = '{0}/cacheCollection/{1}'.format(self.envVariables.SALE_INGESTOR_URL, contractAddress)

        response = requests.post(url)

        if response.ok:
            return True
        else:
            pprint(vars(response))
            raise Exception('Could not cache new collection for contractAddress: {0}'.format(contractAddress))