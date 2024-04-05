# import pika
import traceback
from helpers.getEnvVariables import getEnvVariables
from classes.aggregateClustersAndSales.aggregateClustersAndSales import AggregateClustersAndSales

envVariables = getEnvVariables()

queue = 'clustering_queue'
url = envVariables.RABBIT_MQ_URL
# parameters = pika.URLParameters(url)

aggregateClustersAndSales = AggregateClustersAndSales()

def callback(ch, method, properties, body):
    try:
        contractAddress = body.decode()
        print("Message Received:", contractAddress)

        aggregateClustersAndSales.handler(contractAddress)
        ch.basic_ack(delivery_tag=method.delivery_tag)
    except:
        traceback.print_exc()
        print('Error occurred with processing clusters')

if __name__ == '__main__':
    aggregateClustersAndSales.handler("0x9a534628b4062e123ce7ee2222ec20b86e16ca8f")
    # connection = pika.BlockingConnection(parameters)
    # channel = connection.channel()

    # channel.basic_qos(prefetch_count=1)
    # channel.basic_consume(queue=queue, on_message_callback=callback)
    # channel.start_consuming()
