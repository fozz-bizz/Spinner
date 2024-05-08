export const getRandomSortedNumbers = (length: number) =>
  Array.from({ length }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
