export class Board {
  private readonly grid: string[][];
  private readonly height: number;
  private readonly width: number;

  constructor(board: string[]) {
    if (!board || board.length === 0) {
      this.grid = [];
      this.height = 0;
      this.width = 0;
      return;
    }

    this.grid = board.map(row => row.split('').filter(char => char !== ' '));
    this.height = this.grid.length;
    this.width = this.grid[0]?.length || 0;
  }

  public winner(): string {
    if (this.winningPath('X')) {
      return 'X';
    }

    if (this.winningPath('O')) {
      return 'O';
    }

    return '';
  }

  private winningPath(player: 'X' | 'O'): boolean {
    const queue: [number, number][] = [];
    const visited = new Set<string>();

    for (let r = 0; r < this.height; r++) {
      for (let c = 0; c < this.width; c++) {
        if (this.grid[r][c] === player) {
          if ((player === 'X' && c === 0) || (player === 'O' && r === 0)) {
            const key = `${r},${c}`;
            queue.push([r, c]);
            visited.add(key);
          }
        }
      }
    }

    while (queue.length > 0) {
      const [row, col] = queue.shift()!;

      if ((player === 'X' && col === this.width - 1) || (player === 'O' && row === this.height - 1)) {
        return true;
      }

      const neighbors: [number, number][] = [
        [row, col - 1],
        [row, col + 1],
        [row - 1, col],
        [row - 1, col + 1],
        [row + 1, col],
        [row + 1, col - 1],
      ];

      for (const [newRow, newCol] of neighbors) {
        const key = `${newRow},${newCol}`;
        if (
          this.isValid(newRow, newCol) &&
          !visited.has(key) &&
          this.grid[newRow][newCol] === player
        ) {
          visited.add(key);
          queue.push([newRow, newCol]);
        }
      }
    }

    return false;
  }

  private isValid(r: number, c: number): boolean {
    return r >= 0 && r < this.height && c >= 0 && c < this.width;
  }
}
