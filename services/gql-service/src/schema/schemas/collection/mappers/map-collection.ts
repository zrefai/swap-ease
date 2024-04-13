import { Collection } from 'swap-ease-data';
import { Collection as GQLCollection } from '@server/__generated__/resolvers-types';
import { WithId } from 'mongodb';

export function mapCollection(collection: WithId<Collection>): GQLCollection {
  return {
    id: collection.id,
    totalSupply: collection.totalSupply,
    createdAt: collection.createdAt,
    updatedAt: collection.updatedAt,
    image: collection.image,
    name: collection.name,
    symbol: collection.symbol,
    twitterUrl: collection.twitterUrl,
    discordUrl: collection.discordUrl,
    externalUrl: collection.externalUrl,
  };
}
