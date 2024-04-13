import dotenv from 'dotenv';
import dbClient from '@server/config/db-client';
import startApolloServer from '@server/config/apollo-server';
// import { verifyEnvVariables } from 'swap-ease-utils';

dotenv.config();

// verifyEnvVariables([
//   'RABBIT_MQ_URL',
//   'RESERVOIR_API_KEY',
//   'RESERVOIR_API_URL',
//   'MONGO_DB_CONNECTION_STRING',
//   'MONGO_DB_NAME',
// ]);

dbClient
  .then(async () => {
    console.log('DB client connected');
    startApolloServer();
  })
  .catch((reason) => {
    console.log('An error occurred started the DB client');
    console.log(reason);
  });
