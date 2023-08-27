export interface NftMetadata {
  description?: string;
  attributes?: NftAttribute[];
  image?: string;
  name?: string;
}

interface NftAttribute {
  trait_type: string;
  value: string;
}
