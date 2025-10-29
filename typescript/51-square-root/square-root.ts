export function squareRoot(num: number): number {
  let left = 1;
  let right = num;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const square = mid * mid;

    if (square === num) return mid;
    if (square < num) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return right;
}
