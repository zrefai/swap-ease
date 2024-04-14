import { WithId } from 'mongodb';
import { Token } from 'swap-ease-data';
import {
  Token as GQLToken,
  TokenAttribute,
} from '../../../../__generated__/resolvers-types';

export function mapToken(token: WithId<Token>): GQLToken {
  return {
    contractAddress: token.contractAddress,
    tokenId: token.tokenId,
    name: token.name,
    image: token.image,
    rank: token.rank,
    totalScore: token.totalScore,
    attributes: token.attributes.map(
      (attribute) =>
        ({
          key: attribute.key,
          value: attribute.value,
          score: attribute.score.valueOf(),
        }) as TokenAttribute,
    ),
  };
}
