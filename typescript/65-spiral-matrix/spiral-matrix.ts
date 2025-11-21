export function ofSize(size: number): number[][] {
  const matrix: number[][] = Array.from({length: size}, (): number[] =>
    Array<number>(size).fill(0));

  const pos: number[][] = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
  ];

  let i = 0;
  let row = 0;
  let col = 0;
  const square: number = size * size;

  for (let num = 1; num <= square; num++) {
    matrix[row][col] = num;
    const [dr, dc] = pos[i];
    const nextRow = row + dr;
    const nextCol = col + dc;

    if (
      nextRow < 0 || nextRow >= size ||
      nextCol < 0 || nextCol >= size ||
      matrix[nextRow][nextCol] !== 0
    ) {
      i = (i + 1) % 4;
    }

    const [ndr, ndc] = pos[i];
    row += ndr;
    col += ndc;
  }

  return matrix;
}
