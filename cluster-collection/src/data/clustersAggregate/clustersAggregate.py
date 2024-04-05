from config.mongoDb import get_db
from dataclasses import asdict
from models.clusterAggregate import ClustersAggregate


class ClusterAggregatesClass():
    def __init__(self):
        db = get_db()

        self.collection = db['clustersAggregates']

    def addClustersAggregate(self, clusterAggregate: ClustersAggregate, session):
        try:
            result = self.collection.insert_one(
                asdict(clusterAggregate), session=session)

            return result.acknowledged
        except:
            print('Could not add cluster aggregates data to DB')
            raise Exception('Could not add cluster aggregates to DB')
    
    def getClustersAggregate(self, contractAddress: str):
        try:
            result = self.collection.find_one({"contractAddress": contractAddress}, {'contractAddress': 1})
            return result
        except:
            raise Exception('Could not get cluster aggregate for contractAddress: {0}'.format(contractAddress))
