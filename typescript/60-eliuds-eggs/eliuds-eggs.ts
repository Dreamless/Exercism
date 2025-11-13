export function eggCount(displayValue: number): number {
  let count = 0;
  let n = displayValue;

  while (n > 0) {
    if (n & 1) {
      count += 1;
    } else {
      count += 0;
    }
    n >>>= 1;
  }

  return count;
}
