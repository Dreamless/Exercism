import {Node} from "./trees.js"

export function construct(grid: number[][]): Node {
  function buildTree(row: number, col: number, size: number): Node {
    const val: number = grid[row][col];
    let isSame = true;
    for (let i = row; i < row + size; i++) {
      for (let j = col; j < col + size; j++) {
        if (grid[i][j] !== val) {
          isSame = false;
          break;
        }
      }
    }

    if (isSame) {
      return new Node(Boolean(val), true);
    }

    const mid = size / 2;

    const topLeft: Node = buildTree(row, col, mid);
    const topRight: Node = buildTree(row, col + mid, mid);
    const bottomLeft: Node = buildTree(row + mid, col, mid);
    const bottomRight: Node = buildTree(row + mid, col + mid, mid);

    return new Node(true, false, topLeft, topRight, bottomLeft, bottomRight);
  }

  return buildTree(0, 0, grid.length);
}
