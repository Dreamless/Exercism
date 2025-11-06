export function isArmstrongNumber(number: number | bigint): boolean {
  const numStr = String(number);
  const numDigits = numStr.length;
  const exponent = BigInt(numDigits);

  const sum = Array.from(numStr, BigInt)
    .reduce((acc, digit) => acc + (digit ** exponent), 0n);

  return sum === number;
}
