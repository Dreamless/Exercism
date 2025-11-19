export class GameOfLife {
  private grid: number[][]

  constructor(matrix: number[][]) {
    this.grid = matrix.map(row => [...row])
  }

  public tick(): void {
    const rows = this.grid.length
    const cols = this.grid[0]?.length

    const next: number[][] = Array.from({ length: rows }, (): number[] =>
      Array<number>(cols).fill(0)
    )

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {

        let aliveNeighbors = 0

        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {

            if (dr === 0 && dc === 0) continue
            const nr = r + dr
            const nc = c + dc

            if (
              nr >= 0 && nr < rows &&
              nc >= 0 && nc < cols &&
              this.grid[nr][nc] === 1
            ) {
              aliveNeighbors++
            }
          }
        }

        const cell = this.grid[r][c]

        next[r][c] = (aliveNeighbors === 3 || (aliveNeighbors === 2 && cell === 1)) ? 1 : 0;
      }
    }

    this.grid = next
  }

  public state(): number[][] {
    return this.grid.map(row => [...row])
  }
}
