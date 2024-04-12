import client from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

export interface MQMessage {
  address: string;
}

const RABBIT_MQ_URL = process.env.RABBIT_MQ_URL as string;
const ADD_COLLECTION_QUEUE = 'addresses_for_adding';

export async function produce(contractAddress: string) {
  const connection = await client.connect(RABBIT_MQ_URL);
  const channel = await connection.createChannel();

  try {
    await channel.assertQueue(ADD_COLLECTION_QUEUE);
    return channel.sendToQueue(
      ADD_COLLECTION_QUEUE,
      Buffer.from(JSON.stringify({ address: contractAddress })),
    );
  } catch (error) {
    console.error(error);
    console.log('Could not send message to MQ channel');
    return false;
  } finally {
    await channel.close();
    await connection.close();
  }
}
