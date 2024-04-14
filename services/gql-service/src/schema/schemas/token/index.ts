import { Resolvers } from '../../../__generated__/resolvers-types';
import { mapToken } from './mappers/map-token';

export const tokenResolvers: Resolvers = {
  Query: {
    token: async (_parent, { contractAddress, tokenId }, context) => {
      const document = await context.dataSources.tokens.findOne(
        contractAddress,
        tokenId,
      );
      return document ? mapToken(document) : null;
    },
    tokens: async (
      _parent,
      { contractAddress, tokenIds },
      context, // Maybe we can add an index here for tokenId, contractAddress if query takes too long
    ) => {
      const documents = await context.dataSources.tokens.find(
        contractAddress,
        tokenIds,
      );
      return documents.map((document) => mapToken(document));
    },
  },
};
