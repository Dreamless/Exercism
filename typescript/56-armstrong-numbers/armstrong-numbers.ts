export function isArmstrongNumber(number: number | bigint): boolean {
  const numStr = String(number);
  const numDigits = numStr.length;

  const sum = Array.from(numStr, Number)
    .reduce((acc: number, digit: number): number => acc + (digit ** numDigits), 0);

  return sum === number;
}
