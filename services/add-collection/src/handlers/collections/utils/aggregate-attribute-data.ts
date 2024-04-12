import assert from 'assert';
import { Token, TokenAttribute } from 'swap-ease-data';

export function aggregateAttributeData(tokens: Token[]) {
  const attributeTypes = new Set();
  const tokensCopy = [...tokens];

  // Retrieve all attribute types from all tokens
  for (let i = 0; i < tokensCopy.length; i++) {
    for (let j = 0; j < tokensCopy[i].attributes.length; j++) {
      attributeTypes.add(tokensCopy[i].attributes[j].key);
    }
  }

  // Create array of all unique attribute types from tokens
  const allAttributeTypes = Array.from(attributeTypes) as string[];
  const attributes: {
    [key: string]: { [key: string]: { count: number; tokenIds: string[] } };
  } = {
    attribute_count: {},
  };

  for (let i = 0; i < tokensCopy.length; i++) {
    const tokenId = tokensCopy[i].tokenId;
    const currentAttributes = tokensCopy[i].attributes;

    // Aggregate attribute_count
    if (attributes.attribute_count[currentAttributes.length]) {
      attributes.attribute_count[currentAttributes.length].count++;
      attributes.attribute_count[currentAttributes.length].tokenIds.push(
        tokenId,
      );
    } else {
      attributes.attribute_count[currentAttributes.length] = {
        count: 1,
        tokenIds: [tokenId],
      };
    }

    // Aggregate attributes
    for (let j = 0; j < currentAttributes.length; j++) {
      const currentAttribute = currentAttributes[j];
      const key = currentAttribute.key;
      const value = currentAttribute.value;

      // Count number of occurences for each value of an attribute type
      if (attributes[key]) {
        if (attributes[key][value]) {
          attributes[key][value].count++;
          attributes[key][value].tokenIds.push(tokenId);
        } else {
          attributes[key][value] = { count: 1, tokenIds: [tokenId] };
        }
      } else {
        attributes[key] = {};
        attributes[key][value] = { count: 1, tokenIds: [tokenId] };
      }
    }

    const currentAttributeTypes = currentAttributes.map(
      (att: TokenAttribute) => {
        assert(att.key, 'Key was undefined for the attribute');
        return att.key;
      },
    );

    // Create an absent count for all attributes that are not present in each token
    allAttributeTypes
      .filter((type) => !currentAttributeTypes.includes(type))
      .forEach((absentTraitType) => {
        if (attributes[absentTraitType]) {
          if (attributes[absentTraitType].absent_count) {
            attributes[absentTraitType].absent_count.count++;
          } else {
            attributes[absentTraitType].absent_count = {
              count: 1,
              tokenIds: [],
            };
          }
        } else {
          attributes[absentTraitType] = {
            absent_count: { count: 1, tokenIds: [] },
          };
        }
      });
  }

  return attributes;
}
