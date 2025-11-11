export class GameOfLife {
  private grid: number[][]

  constructor(matrix: number[][]) {
    this.grid = matrix.map(row => [...row])
  }

  public tick(): void {
    const rows = this.grid.length
    const cols = this.grid[0].length

    const next: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0))

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {

      }
    }

    this.grid = next
  }

  public state(): number[][] {
    return this.grid.map(row => [...row])
  }
}
