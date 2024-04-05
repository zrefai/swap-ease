from dataclasses import asdict
import traceback
from config.mongoDb import get_db
from models.sale import Sale


class SalesClass():
    def __init__(self):
        db = get_db()
        self.collection = db['sales']

    def addSales(self, sales: list[Sale], session) -> bool:
        serializedSales = [asdict(s) for s in sales]

        try:
            result = self.collection.insert_many(serializedSales, session=session)

            return result.acknowledged
        except:
            traceback.print_exc()
            print('Could not add sales to DB')
            raise Exception('Could not add sales to DB')
