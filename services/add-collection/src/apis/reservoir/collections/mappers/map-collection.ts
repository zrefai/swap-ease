import { definitions } from "@reservoir0x/reservoir-sdk";
import { Collection } from "@server/models/collection";
import assert from "assert";

export function mapCollection(
  collection: definitions["Model37"],
  contractAddress: string,
): Collection {
  const id = collection.id;
  assert(
    id && id === contractAddress,
    `Contract address did not match id for address:  ${contractAddress}`,
  );

  const totalSupply = collection.tokenCount;
  assert(
    totalSupply && totalSupply.length > 0,
    `Total supply was not available for address: ${contractAddress}`,
  );

  assert(
    collection.contractKind && collection.contractKind === "erc721",
    `Token type was not available or was not an ERC721 contract for address: ${contractAddress}`,
  );

  return {
    id: id,
    totalSupply,
    name: collection.name,
    symbol: collection.symbol,
    image: collection.image,
    discordUrl: collection.discordUrl,
    twitterUrl: collection.twitterUrl,
    externalUrl: collection.externalUrl,
    creator: collection.creator,
    attributes: undefined,
    createdAt: undefined,
    updatedAt: undefined,
  };
}
