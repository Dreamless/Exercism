export type Classification = 'perfect' | 'abundant' | 'deficient';

export function classify(n: number): Classification {
  if (n <= 0 || !Number.isInteger(n)) {
    throw new Error('Classification is only possible for natural numbers.');
  }

  if (n === 1) return 'deficient';

  const limit = Math.sqrt(n);
  let sum = 1;

  for (let i = 2; i <= limit; i++) {
    if (n % i === 0) {
      sum += i;
      const pair = n / i;
      if (pair !== i) sum += pair;
    }
  }

  if (sum === n) return 'perfect';
  if (sum > n) return 'abundant';
  return 'deficient';
}
