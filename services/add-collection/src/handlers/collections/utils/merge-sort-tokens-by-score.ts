import { Token } from 'swap-ease-data';

export function mergeSortTokensByScore(tokens: Token[]) {
  const copyArray = [...tokens];
  const sortedNFTs = mergeSort(copyArray).reduce(
    (prev: Map<string, number>, curr: Token, currentIndex) => {
      prev.set(curr.tokenId, currentIndex + 1);

      return prev;
    },
    new Map(),
  );

  return tokens.map((token) => {
    return {
      ...token,
      rank: sortedNFTs.get(token.tokenId) ?? -1,
    };
  });
}

export function mergeSort(tokens: Token[]): Token[] {
  const half = tokens.length / 2;

  if (tokens.length < 2) {
    return tokens;
  }

  const left = tokens.splice(0, half);

  return merge(mergeSort(left), mergeSort(tokens));
}

function merge(left: Token[], right: Token[]): Token[] {
  const arr: Token[] = [];

  while (left.length && right.length) {
    const leftScore = left[0].totalScore as number;
    const rightScore = right[0].totalScore as number;

    if (leftScore > rightScore) {
      const shiftedRank = left.shift();
      if (shiftedRank !== undefined) {
        arr.push(shiftedRank);
      }
    } else {
      const shiftedRank = right.shift();
      if (shiftedRank !== undefined) {
        arr.push(shiftedRank);
      }
    }
  }

  return [...arr, ...left, ...right];
}
