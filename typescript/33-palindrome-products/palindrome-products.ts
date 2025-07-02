export interface Input {
  maxFactor: number;
  minFactor?: number;
}

type FactorPair = [number, number];

interface PalindromeResult {
  value: number;
  factors: FactorPair[];
}

export interface Output {
  smallest: PalindromeResult | null;
  largest: PalindromeResult | null;
}

export function generate({ maxFactor, minFactor = 0 }: Input): Output {
  let smallest: PalindromeResult | null = null;
  let largest: PalindromeResult | null = null;

  for (let i = minFactor; i <= maxFactor; i++) {
    for (let j = i; j <= maxFactor; j++) {
      const product = i * j;
      if (isPalindrome(product)) {
        if (!smallest || product < smallest.value) {
          smallest = { value: product, factors: [[i, j]] };
        } else if (product === smallest.value) {
          smallest.factors.push([i, j]);
        }

        if (!largest || product > largest.value) {
          largest = { value: product, factors: [[i, j]] };
        } else if (product === largest.value) {
          largest.factors.push([i, j]);
        }
      }
    }
  }

  return { smallest, largest };
}

function isPalindrome(n: number): boolean {
  const str = n.toString();
  return str === str.split('').reverse().join('');
}
