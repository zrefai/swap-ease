import dotenv from 'dotenv';
// import '@config/rabbit-mq-client';
import dbClient from '@config/db-client';
import { verifyEnvVariables } from 'swap-ease-utils';
// import { consumeAndProduce } from './config/rabbit-mq-client';
import { AddCollection } from '@handlers/collections/add-collection.handler';

dotenv.config();

verifyEnvVariables([
  'RABBIT_MQ_URL',
  'RESERVOIR_API_KEY',
  'RESERVOIR_API_URL',
  'MONGO_DB_CONNECTION_STRING',
  'MONGO_DB_NAME',
]);

dbClient
  .then(async () => {
    // console.log('DB client connected');
    const controller = new AddCollection();
    await controller.handler('0x9a534628b4062e123ce7ee2222ec20b86e16ca8f');
    // await consumeAndProduce();
  })
  .catch((reason) => {
    console.log('An error occurred started the DB client');
    console.log(reason);
  });
