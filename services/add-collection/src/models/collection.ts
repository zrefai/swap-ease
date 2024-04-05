import { AuditModel } from "@server/data/audit-model";

export interface Collection extends AuditModel {
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
