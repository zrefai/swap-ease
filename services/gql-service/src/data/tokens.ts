import { Collection } from 'mongodb';
import { Token } from '../__generated__/resolvers-types';
import { db } from '../config/db-client';

export class Tokens {
  private tokens: Collection<Token>;

  constructor() {
    this.tokens = db.collection('tokens') as Collection<Token>;
  }

  async findOne(contractAddress: string, tokenId: string) {
    return await this.tokens.findOne({ contractAddress, tokenId });
  }

  async find(contractAddress: string, tokenIds: string[]) {
    return await this.tokens
      .find({ contractAddress, tokenId: { $in: tokenIds } })
      .toArray();
  }
}
