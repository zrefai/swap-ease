import json
import requests
import datetime
from pprint import pprint
from models.sale import Sale
from utils.constants import DATE_BOUNDARY
from helpers.getEnvVariables import getEnvVariables
from apis.reservoir.mapSales import mapGetSalesResponse
from apis.reservoir.salesDataClasses import GetSalesResponse


class SalesClass:
    def __init__(self):
        self.envVariables = getEnvVariables()

    """
    Gets all sales of a contract address from the last 90 days.

    @contractAddress: The collection's contract address to get sales for.
    @returns A list of sales for the given contract address
    """

    def getSales(self, contractAddress: str) -> list[Sale]:
        # Get date from 90 days ago
        currentDate = datetime.datetime.now()
        startTimestamp = datetime.datetime.timestamp(
            currentDate - datetime.timedelta(days=DATE_BOUNDARY))

        sales: list[Sale] = []

        # Get first request, then loop based on continuation token
        response = self.__callGetSales(
            contractAddress, startTimestamp)

        # Spread contents of response in sales array
        sales.extend(response.sales)

        while response.continuation is not None:
            response = self.__callGetSales(
                contractAddress, startTimestamp, response.continuation)
            # Continue to add any sales in sales array
            sales.extend(response.sales)

        return sales

    """
    Calls the sales endpoint with the given parameters. It also accepts a continuation token for getting results spanning multiple pages.

    @contractAddress: The collection's contract address to get sales for.
    @startTimestamp: Get events after a particular unix timestamp (inclusive).
    @continuationToken: The continuation token used to retrieve other pages of results.
    @returns Response from the Reservoir API for the sales endpoint
    """

    def __callGetSales(self, contractAddress: str, startTimestamp: int, continuationToken=None) -> GetSalesResponse:
        parameters = {
            'limit': '1000',
            'collection': contractAddress,
            'startTimestamp': startTimestamp,
            'continuation': continuationToken
        }

        url = '{0}/sales/v6'.format(self.envVariables.RESERVOIR_API_URL)
        headers = {
            'accept': '*/*',
            'x-api-key': self.envVariables.RESERVOIR_API_KEY
        }

        response = requests.get(url=url, headers=headers, params=parameters)

        if response.ok:
            return mapGetSalesResponse(json.loads(response._content.decode('utf-8')))
        else:
            pprint(vars(response))
            raise Exception('Could not get sales from Reservoid API')
