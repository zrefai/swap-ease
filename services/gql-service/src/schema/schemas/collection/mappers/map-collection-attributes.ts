import { CollectionAttribute } from '../../../../__generated__/resolvers-types';
import { Collection, PartialModel } from 'swap-ease-data';

export function mapCollectionAttributes(
  document: PartialModel<Collection, 'attributes'>,
): CollectionAttribute[] {
  return document.attributes.map((attribute) => ({
    type: attribute.type,
    values: attribute.values.map((value) => ({
      type: value.type,
      count: value.count,
      tokenIds: value.tokenIds,
    })),
  }));
}
