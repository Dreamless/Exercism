export const eggCount = (displayValue: number): number => {
  let count = 0;
  let n = displayValue;

  while (n > 0) {
    n = n & (n - 1);
    count++;
  }

  return count;
};
