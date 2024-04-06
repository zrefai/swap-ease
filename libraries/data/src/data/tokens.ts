import { ClientSession, Collection, Db } from 'mongodb';
import { Token } from '../models/token';
import { TOKENS } from '.';

export class Tokens {
  private tokens: Collection<Token>;

  constructor(db: Db) {
    this.tokens = db.collection(TOKENS) as Collection<Token>;
  }

  async findOne(contractAddress: string, tokenId: string) {
    return await this.tokens.findOne({ contractAddress, tokenId });
  }

  async find(contractAddress: string, tokenIds: string[]) {
    return await this.tokens
      .find({ contractAddress, tokenId: { $in: tokenIds } })
      .toArray();
  }

  async insertMany(
    documents: Token[],
    session: ClientSession | undefined = undefined,
  ): Promise<boolean> {
    const result = await this.tokens.insertMany(documents, { session });
    return Object.keys(result.insertedIds).length === documents.length;
  }
}
