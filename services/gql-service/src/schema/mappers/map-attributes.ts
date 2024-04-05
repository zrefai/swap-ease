import {
  Attribute,
  AttributeValues,
} from '../../__generated__/resolvers-types';

export function mapAttributes(attributes: {
  [key: string]: { [key: string]: number };
}) {
  const arr: Attribute[] = [];

  for (const type of Object.keys(attributes)) {
    const values: AttributeValues[] = [];
    for (const key of Object.keys(attributes[type])) {
      values.push({ type: key, count: attributes[type][key] });
    }
    arr.push({ type, values });
  }

  return arr;
}
