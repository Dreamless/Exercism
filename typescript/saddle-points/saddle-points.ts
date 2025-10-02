export type SaddlePoint = { row: number; column: number };

export function saddlePoints(grid: number[][]): SaddlePoint[] {
  if (grid.length === 0 || grid[0].length === 0) return [];

  const rows = grid.length;
  const cols = grid[0].length;
  const result: SaddlePoint[] = [];

  const colMin = new Array<number>(cols);
  for (let c = 0; c < cols; c++) {
    let minVal = grid[0][c];
    for (let r = 1; r < rows; r++) {
      if (grid[r][c] < minVal) {
        minVal = grid[r][c];
      }
    }
    colMin[c] = minVal;
  }

  for (let r = 0; r < rows; r++) {
    const row: number[] = grid[r];
    const maxInRow = Math.max(...row);
    for (let c = 0; c < cols; c++) {
      if (row[c] === maxInRow && row[c] === colMin[c]) {
        result.push({ row: r + 1, column: c + 1 });
      }
    }
  }

  return result;
}
