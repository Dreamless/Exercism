export function steps(count: number): number {
  if (!Number.isInteger(count) || count <= 0) {
    throw new Error("Only positive integers are allowed");
  }

  let n: number = count;
  let step = 0;

  if (n === 1) {
    return 0;
  }

  while (n !== 1) {
    if (n % 2 === 0) {
      n /= 2;
    } else {
      n = 3 * n + 1;
    }

    step++;
  }

  return step;
}
