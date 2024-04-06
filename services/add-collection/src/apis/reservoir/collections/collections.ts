import { paths } from '@reservoir0x/reservoir-sdk';
import { ReservoirAPI } from '../reservoir-api';
import { mapCollection } from './mappers/map-collection';

export class Collections extends ReservoirAPI {
  constructor() {
    super();
  }

  async getCollectionByContractAddress(contractAddress: string) {
    const params = new URLSearchParams({
      id: contractAddress,
    });
    const url = new URL(`collections/v7?${params.toString()}`, this.apiURL);

    const response = (await super.fetch(url, {
      method: 'GET',
    })) as paths['/collections/v7']['get']['responses']['200']['schema'];

    if (response.collections && response.collections.length === 1) {
      return mapCollection(response.collections[0], contractAddress);
    }

    throw new Error(
      `Failed to find a collection for the given contract address: ${contractAddress}`,
    );
  }
}
