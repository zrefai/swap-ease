import { MongoClient } from "mongodb";
// import { WebsocketClient } from './config/websocket-client';
import { createServer } from "@server/config/express";
import dbClient from "@server/config/db-client";
import { ClustersCache } from "@server/utilities/clusters-cache";
import { WebsocketClient } from "./config/websocket/websocket-client";

export const clustersCache = new ClustersCache();

// TODO: update with Websocket URL from Reservoir once purchased
export const wsc = new WebsocketClient("");

const port = process.env.PORT || 8000;

async function startServer(db: MongoClient) {
  const app = createServer();

  app.listen(port, () => {
    console.log("Server is running on port", port);
  });

  const signalTraps: NodeJS.Signals[] = ["SIGTERM", "SIGINT", "SIGUSR2"];

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
    console.log("DB client connected");
    await clustersCache.fillCache();
    console.log("Cache filled");
    startServer(v);
    wsc.connect();
  })
  .catch((reason) => {
    console.log(reason);
  });
