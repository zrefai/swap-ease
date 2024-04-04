import Websocket, { RawData } from 'ws';
import { WebsocketSaleResponse } from '@server/models/websocket-sale.response';
import { clustersCache } from '../..';
import { mapSale } from './utilities/map-sale';
import { buildSaleOperation } from './utilities/build-sale-operation';
import { Sales } from '@server/data/sales';

const ORDER_SOURCE = ['opensea.io', 'blur.io', 'x2y2.io', 'looksrare.org'];

export class WebsocketClient {
  private ws: Websocket;
  private apiKey: string;
  private sales: Sales;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.ws = new Websocket(`wss://ws.reservoir.tools?api-key=${this.apiKey}`);
    this.sales = new Sales();
  }

  public connect = () => {
    this.ws.on('open', () => {
      console.log('connected');
      this.subscribe();
    });

    this.ws.on('message', (data: RawData) => {
      this.handleMessage(data);
    });

    this.ws.on('close', () => {
      console.log('closed');
      this.connect();
    });
  };

  public handleMessage = async (data: RawData) => {
    try {
      // TODO: gotta see what this actually outputs when we get access to the endpoint
      const response = JSON.parse(data.toString()) as WebsocketSaleResponse;

      const sale = mapSale(response);

      const operation = buildSaleOperation(
        response.event,
        response.changed,
        sale
      );

      await this.sales.bulkWrite([operation]);
    } catch (error) {
      console.error(error);
    }
  };

  public subscribe = () => {
    this.ws.send(
      JSON.stringify({
        type: 'subscribe',
        event: 'sale.*',
        filters: {
          orderSource: ORDER_SOURCE,
          contract: clustersCache.getAllContractAddresses(),
        },
      })
    );
  };

  public update = () => {
    this.ws.send(
      JSON.stringify({
        type: 'subscribe',
        event: 'sale.*',
        filters: {
          orderSource: ORDER_SOURCE,
          contract: clustersCache.getAllContractAddresses(),
        },
      })
    );
  };
}
