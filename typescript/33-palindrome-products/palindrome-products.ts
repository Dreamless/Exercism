export interface Input {
  maxFactor: number;
  minFactor?: number;
}

type FactorPair = [number, number];

export interface PalindromeResult {
  value: number | null;
  factors: FactorPair[];
}

export interface Output {
  smallest: PalindromeResult;
  largest: PalindromeResult;
}

export function generate({ maxFactor, minFactor = 0 }: Input): Output {
  if (minFactor > maxFactor) {
    throw new Error('min must be <= max');
  }

  let smallest: PalindromeResult = { value: null, factors: [] };
  let largest: PalindromeResult = { value: null, factors: [] };

  for (let i = minFactor; i <= maxFactor; i++) {
    let product = i * i;
    for (let j = i; j <= maxFactor; j++) {
      if (isPalindrome(product)) {
        if (smallest.value === null || product < smallest.value) {
          smallest = { value: product, factors: [[i, j]] };
        } else if (product === smallest.value) {
          smallest.factors.push([i, j]);
        }

        if (largest.value === null || product > largest.value) {
          largest = { value: product, factors: [[i, j]] };
        } else if (product === largest.value) {
          largest.factors.push([i, j]);
        }
      }

      product += i;
    }
  }

  return {
    smallest,
    largest,
  };
}

function isPalindrome(n: number): boolean {
  if (n < 0) return false;

  const original = n;
  let reversed = 0;

  while (n > 0) {
    const digit = n % 10;
    reversed = reversed * 10 + digit;
    n = (n / 10) | 0;
  }

  return original === reversed;
}
