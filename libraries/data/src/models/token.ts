import { Double } from 'mongodb';

export interface Token {
  contractAddress: string;
  tokenId: string;
  name?: string;
  image?: string;
  attributes: TokenAttribute[];
  totalScore?: number;
  rank?: number;
}

export interface TokenAttribute {
  key: string;
  kind?: string;
  value: string;
  score?: Double;
}
