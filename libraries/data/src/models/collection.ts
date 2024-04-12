import { Audit } from './audit';

export interface Collection extends Audit {
  id: string;
  totalSupply: string;
  name?: string;
  symbol?: string;
  image?: string;
  discordUrl?: string;
  twitterUrl?: string;
  externalUrl?: string;
  creator?: string;
  // Not used in gql-service, but used in add-collection when creating collection document
  attributes?: CollectionAttribute[];
}

export interface CollectionAttribute {
  type: string;
  values: CollectionAttributeValue[];
}

export interface CollectionAttributeValue {
  type: string;
  count: number;
  tokenIds: string[];
}
