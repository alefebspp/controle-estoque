export function compareTextsWithNumbers(a: string, b: string): number {
  const numExtractor = /(\d+)/g;

  const getNumericChunks = (str: string): number[] => {
    return (str.match(numExtractor) || []).map(Number);
  };

  const alphaPartA = a.replace(numExtractor, '');
  const alphaPartB = b.replace(numExtractor, '');

  if (alphaPartA !== alphaPartB) {
    return alphaPartA.localeCompare(alphaPartB);
  }

  const numericChunksA = getNumericChunks(a);
  const numericChunksB = getNumericChunks(b);

  for (
    let i = 0;
    i < Math.min(numericChunksA.length, numericChunksB.length);
    i++
  ) {
    const numericChunkA = numericChunksA[i];
    const numericChunkB = numericChunksB[i];

    if (numericChunkA !== numericChunkB) {
      return numericChunkA - numericChunkB;
    }
  }

  return 0;
}
