import { Resolvers } from '../../../__generated__/resolvers-types';

export const tokenResolvers: Resolvers = {
  Query: {
    token: async (_parent, { contractAddress, tokenId }, context) =>
      await context.dataSources.tokens.findOne(contractAddress, tokenId),
    tokens: async (
      _parent,
      { contractAddress, tokenIds },
      context // Maybe we can add an index here for tokenId, contractAddress if query takes too long
    ) => await context.dataSources.tokens.find(contractAddress, tokenIds),
  },
};
