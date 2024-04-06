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
  attributes?: Attribute[];
}

export interface Attribute {
  type: string;
  values: AttributeValue[];
}

export interface AttributeValue {
  type: string;
  count: number;
}
