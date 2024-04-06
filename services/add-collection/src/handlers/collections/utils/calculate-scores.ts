import { Double } from 'mongodb';
import { Token } from 'swap-ease-data';

/**
 * Calculates the scores of all tokens provided so that they can be accurately ranked. Modifies the tokens array in memory to accomplish this by adding the necessary details to each token and their list of attributes.
 * @param tokens The list of tokens to be modified for ranking
 * @param attributes A dictionary of attributes which contains the total count of each attribute value in a collection
 */
export function calculateScores(
  tokens: Token[],
  attributes: { [key: string]: { [key: string]: number } },
) {
  const totalSupply = tokens.length;
  const attributeTypes = Object.keys(attributes);

  // Create score and store it
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    let totalScore = 0;

    if (token.attributes.length > 0) {
      const currentAttributes = token.attributes;
      // Keep track of actual length of attributes for the current token before we modify/add other attributes
      const currentAttributesLength = currentAttributes.length.toString();

      // Calculate rarity score for each attribute, add score to each attribute for the current token
      for (let j = 0; j < currentAttributes.length; j++) {
        const rarityScore =
          1 /
          (attributes[currentAttributes[j].key][currentAttributes[j].value] /
            totalSupply);

        currentAttributes[j].score = new Double(rarityScore);
        totalScore += rarityScore;
      }

      // Add attributes that are missing to the list of attributes for the current token
      const currentAttributeTypes = currentAttributes.map((a) => a.key);
      attributeTypes
        .filter(
          (attributeType) => !currentAttributeTypes.includes(attributeType),
        )
        .forEach((attributeType) => {
          if (attributeType === 'attribute_count') {
            const rarityScoreNumTraits =
              1 /
              (attributes.attribute_count[currentAttributesLength] /
                totalSupply);
            // Push attribute for number of attributes (i.e attribute_count)
            currentAttributes.push({
              key: 'attribute_count',
              kind: undefined,
              value: currentAttributesLength,
              score: new Double(rarityScoreNumTraits),
            });
            totalScore += rarityScoreNumTraits;
          } else {
            const rarityScoreNull =
              1 / (attributes[attributeType].absent_count / totalSupply);
            // Add the attribute that was previously absent from the list of attributes for the current token
            currentAttributes.push({
              key: attributeType,
              kind: undefined,
              value: null as unknown as string,
              score: new Double(rarityScoreNull),
            });
            totalScore += rarityScoreNull;
          }
        });
    }

    // Add total score to the current token
    token.totalScore = totalScore;
  }
}
