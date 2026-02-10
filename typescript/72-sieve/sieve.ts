export function primes(limit: number): number[] {
  const isPrime: number[] = new Array<number>(limit + 1).fill(1);

  isPrime[0] = 0;
  isPrime[1] = 0;

  for (let p = 2; p * p <= limit; p++) {
    if (isPrime[p]) {
      for (let multiply = p * p; multiply <= limit; multiply += p) {
        isPrime[multiply] = 0;
      }
    }
  }

  const result: number[] = [];
  for (let i = 2; i <= limit; i++) {
    if (isPrime[i]) {
      result.push(i);
    }
  }

  return result;
}
