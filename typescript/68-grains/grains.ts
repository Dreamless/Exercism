export const square = (num: number): bigint => {
  if (num > 64) throw new Error('Number must not be greater than 64');
  return BigInt(2 ** (num - 1));
}

export const total = (): bigint => {
  return (2n ** 64n) - 1n;
}
