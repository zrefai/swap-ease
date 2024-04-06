import express from 'express';
import { clustersCache, wsc } from '..';
import { Clusters } from 'swap-ease-data';
import { db } from './db-client';

const createServer = (): express.Application => {
  const app = express();

  app.use(express.json());

  const router = express.Router();

  router.get('/ping', (_req, res) => {
    return res.send('pong');
  });

  router.get('/getClusterId/:contractAddress/:tokenId', async (req, res) => {
    return res
      .status(200)
      .send(
        clustersCache.getClusterId(
          req.params.contractAddress,
          req.params.tokenId,
        ),
      );
  });

  router.post('/cacheCollection/:contractAddress', async (req, res) => {
    const clustersData = new Clusters(db);
    const clusters = await clustersData.getClusterDataForCache(
      req.params.contractAddress,
    );

    for (const cluster of clusters) {
      clustersCache.add(cluster);
    }

    // Update websocket filters
    wsc.update();

    return res.status(200).send();
  });

  app.use(router);

  return app;
};

export { createServer };
