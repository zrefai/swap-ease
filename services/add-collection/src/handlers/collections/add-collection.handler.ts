import assert from 'assert';
import { aggregateAttributeData } from './utils/aggregate-attribute-data';
import { Collections as ReservoirCollections } from '@server/apis/reservoir/collections/collections';
import { Tokens } from '@server/apis/reservoir/tokens/tokens';
import { calculateScores } from './utils/calculate-scores';
import { mergeSortTokensByScore } from './utils/merge-sort-tokens-by-score';
import { insertCollection } from './utils/insert-collection';
import { Collections } from 'swap-ease-data';
import { db } from '@server/config/db-client';

export class AddCollection {
  private collections: Collections;
  private tokens: Tokens;
  private reservoirCollections: ReservoirCollections;

  constructor() {
    this.collections = new Collections(db);
    this.tokens = new Tokens();
    this.reservoirCollections = new ReservoirCollections();
  }

  /**
   * Adds a new collection to our DB.
   * @param contractAddress Contract address for the collection
   */
  async handler(contractAddress: string) {
    // Ensure contract doesnt already exist within DB
    const collectionData = await this.collections.findOne(contractAddress);

    if (collectionData) {
      throw new Error('Collection already exists');
    }

    const collection =
      await this.reservoirCollections.getCollectionByContractAddress(
        contractAddress,
      );

    console.log(`Total supply: ${collection.totalSupply}`);

    // TODO: Maybe we should check if it's open sea verified

    const tokens = await this.tokens.getAllTokensInCollection(contractAddress);
    assert(
      tokens.length === parseInt(collection.totalSupply),
      `Total length of retrieved tokens is not equal to total supply for contract address: ${contractAddress}`,
    );

    const attributes = aggregateAttributeData(tokens);

    // Add attributes to collection
    collection.attributes = Object.keys(attributes).map((attributeType) => {
      return {
        type: attributeType,
        values: Object.keys(attributes[attributeType]).map(
          (attributeValue) => ({
            type: attributeValue,
            count: attributes[attributeType][attributeValue].count,
            tokenIds: attributes[attributeType][attributeValue].tokenIds,
          }),
        ),
      };
    });

    calculateScores(tokens, attributes);

    // Sort the tokens by totalScore, then add the rank number to each token
    const rankedTokens = mergeSortTokensByScore(tokens);

    await insertCollection(rankedTokens, collection);
  }
}
