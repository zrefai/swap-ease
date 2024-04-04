import { Double } from "mongodb";

export interface Token {
  contractAddress: string;
  tokenId: string;
  name?: string;
  image?: string;
  attributes: Attribute[];
  totalScore?: number;
  rank?: number;
}

export interface Attribute {
  key: string;
  kind?: string;
  value: string;
  score?: Double;
}
