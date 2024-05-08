export const getRandomSortedNumbers = (length: number) =>
  Array.from({ length }, (_, i) => i + 1).sort(() => Math.random() - 0.5);

export function isPrime(number: number) {
  if (number <= 1) return false;
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) return false;
  }
  return true;
}
