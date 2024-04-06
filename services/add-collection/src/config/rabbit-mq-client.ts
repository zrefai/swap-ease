import { AddCollection } from '@server/handlers/collections/add-collection.handler';
import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

export interface MQMessage {
  address: string;
}

const RABBIT_MQ_URL = process.env.RABBIT_MQ_URL as string;
const ADD_COLLECTION_QUEUE = 'addresses_for_adding';
const CLUSTERING_QUEUE = 'addresses_for_clustering';
let mqConnection: amqp.Connection | null;

export async function consumeAndProduce() {
  const controller = new AddCollection();

  try {
    if (!mqConnection) {
      mqConnection = await amqp.connect(RABBIT_MQ_URL);
    }
    const channel = await mqConnection.createChannel();

    await channel.assertQueue(ADD_COLLECTION_QUEUE);

    //Consume messages from add collection queue
    channel.consume(ADD_COLLECTION_QUEUE, async (msg) => {
      if (msg !== null) {
        const address = JSON.parse(msg.content.toString()).address;
        console.log('Received messaged:', address);

        // Run add collection handler
        await controller.handler(address);

        // Send message to clustering queue
        await channel.assertQueue(CLUSTERING_QUEUE);
        channel.sendToQueue(CLUSTERING_QUEUE, msg.content);

        // Acknowledge consumed message to remove it from ADD_COLLECTION_QUEUE
        channel.ack(msg);
      }
    });
  } catch (e) {
    console.error(e);

    await consumeAndProduce();
  }
}

process.on('exit', async () => {
  if (mqConnection) {
    await mqConnection.close();
  }
  console.log(`Closing rabbitmq channel`);
});
