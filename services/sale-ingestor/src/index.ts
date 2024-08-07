import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { createServer } from '@server/config/express';
import dbClient from '@server/config/db-client';
import { ClustersCache } from '@server/utils/clusters-cache';
import { WebsocketClient } from './config/websocket/websocket-client';
// import { WebsocketClient } from './config/websocket-client';
// import { verifyEnvVariables } from 'swap-ease-utils';

dotenv.config();

// verifyEnvVariables([
//   'MONGO_DB_NAME',
//   'MONGO_DB_CONNECTION_STRING',
//   'RESERVOIR_WEBSOCKET_URL',
// ]);

export const clustersCache = new ClustersCache();

// TODO: update with Websocket URL from Reservoir once purchased
export const wsc = new WebsocketClient('');

const port = process.env.PORT || 8000;

async function startServer(db: MongoClient) {
  const app = createServer();

  app.listen(port, () => {
    console.log('Server is running on port', port);
  });

  const signalTraps: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];

  signalTraps.forEach((type) => {
    process.on(type, () => {
      console.log(`process.on ${type}`);

      db.close();
      process.exit(0);
    });
  });
}

dbClient
  .then(async (v) => {
    console.log('DB client connected');
    await clustersCache.fillCache();
    console.log('Cache filled');
    startServer(v);
    wsc.connect();
  })
  .catch((reason) => {
    console.log(reason);
  });
