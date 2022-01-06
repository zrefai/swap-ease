export interface NFTMetadata {
  description?: string;
  attributes?: NFTAttribute[];
  image?: string;
  name?: string;
}

interface NFTAttribute {
  trait_type: string;
  value: string;
}
