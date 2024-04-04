from dataclasses import dataclass
from typing import Union
from dotenv import dotenv_values


@dataclass
class EnvVariable:
    MONGO_DB_CONNECTION_STRING: str
    MONGO_DB_NAME: str
    RESERVOIR_API_URL: str
    RESERVOIR_API_KEY: str
    RABBIT_MQ_URL: str
    SALE_INGESTOR_URL: str


def verifyEnvVariable(key: str, dotenvObject: dict[str, Union[str, None]]):
    envVariable = dotenvObject[key]

    assert envVariable is not None and len(
        envVariable) > 0, "Environment variable {0} is undefined or empty".format(key)

    return envVariable


def getEnvVariables():
    dotenvObject = dotenv_values('.env')
    
    MONGO_DB_CONNECTION_STRING = verifyEnvVariable(
        'MONGO_DB_CONNECTION_STRING', dotenvObject)
    MONGO_DB_NAME = verifyEnvVariable('MONGO_DB_NAME', dotenvObject)
    RESERVOIR_API_URL = verifyEnvVariable('RESERVOIR_API_URL', dotenvObject)
    RESERVOIR_API_KEY = verifyEnvVariable('RESERVOIR_API_KEY', dotenvObject)
    RABBIT_MQ_URL = verifyEnvVariable('RABBIT_MQ_URL', dotenvObject)
    SALE_INGESTOR_URL = verifyEnvVariable('SALE_INGESTOR_URL', dotenvObject)


    return EnvVariable(
        MONGO_DB_CONNECTION_STRING,
        MONGO_DB_NAME,
        RESERVOIR_API_URL,
        RESERVOIR_API_KEY,
        RABBIT_MQ_URL,
        SALE_INGESTOR_URL
    )
