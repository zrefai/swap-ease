import { definitions } from '@reservoir0x/reservoir-sdk';
import assert from 'assert';
import { Token, TokenAttribute } from 'swap-ease-data';

export function mapToken(token: definitions['Model98']): Token {
  assert(token.token, 'Token information is undefined');

  return {
    contractAddress: token.token.contract,
    tokenId: token.token.tokenId,
    name: token.token.name,
    image: token.token.image,
    attributes: mapAttributes(token.token.attributes ?? []),
    totalScore: undefined,
    rank: undefined,
  };
}

function mapAttributes(attributes: definitions['Model96']): TokenAttribute[] {
  return attributes.map((attribute) => {
    assert(attribute.key, 'Key on attribute is undefined');

    return {
      key: attribute.key,
      kind: attribute.kind,
      value: attribute.value,
      score: undefined,
    };
  });
}
