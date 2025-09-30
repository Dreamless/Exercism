export type SaddlePoint = { row: number; column: number };

export function saddlePoints(grid: number[][]): SaddlePoint[] {
  const rows = grid.length;
  const cols = grid[0].length;

  const result: SaddlePoint[] = [];

  const rowMax = new Array<number>(rows);
  for (let r = 0; r < rows; r++) {
    let maxVal = grid[r][0];
    for (let c = 1; c < cols; c++) {
      if (grid[r][c] > maxVal) {
        maxVal = grid[r][c];
      }
    }
    rowMax[r] = maxVal;
  }

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
    for (let c = 0; c < cols; c++) {
      const val = grid[r][c];
      if (val === rowMax[r] && val === colMin[c]) {
        result.push({ row: r + 1, column: c + 1 });
      }
    }
  }

  return result;
}
