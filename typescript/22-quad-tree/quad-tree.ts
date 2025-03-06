import {Node} from "./trees.js"

export function construct(grid: number[][]): Node {
  function buildTree(row: number, col: number, size: number): Node {
    const val = Boolean(grid[row][col]);
    if (size === 1) {
      return new Node(val, true)
    }

    const mid = size / 2;

    const topLeft: Node = buildTree(row, col, mid);
    const topRight: Node = buildTree(row, col + mid, mid);
    const bottomLeft: Node = buildTree(row + mid, col, mid);
    const bottomRight: Node = buildTree(row + mid, col + mid, mid);

    const isAllLeaf: boolean = topLeft.isLeaf && topRight.isLeaf && bottomLeft.isLeaf && bottomRight.isLeaf;
    const isAllSame: boolean = topLeft.val === topRight.val && topLeft.val === bottomLeft.val && topLeft.val === bottomRight.val;

    if (isAllLeaf && isAllSame) {
      return new Node(val, true);
    }

    return new Node(true, false, topLeft, topRight, bottomLeft, bottomRight);
  }

  return buildTree(0, 0, grid.length);
}
