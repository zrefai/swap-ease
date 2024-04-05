import pymongo
from helpers.getEnvVariables import getEnvVariables

envVariables = getEnvVariables()
client = pymongo.MongoClient(envVariables.MONGO_DB_CONNECTION_STRING)


def get_db():
    return client[envVariables.MONGO_DB_NAME]


def get_client():
    return client


if __name__ == '__main__':
    db = get_db()
