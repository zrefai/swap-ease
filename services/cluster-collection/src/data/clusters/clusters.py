from config.mongoDb import get_db
from dataclasses import asdict
from models.cluster import Cluster


class ClustersClass():
    def __init__(self):
        db = get_db()
        self.collection = db['clusters']

    def addClusters(self, clusters: list[Cluster], session) -> bool:
        serializedClusters = [asdict(c) for c in clusters]

        try:
            result = self.collection.insert_many(
                serializedClusters, session=session)

            return result.acknowledged
        except:
            print('Could not add clusters to DB')
            raise Exception('Could not add clusters to DB')
