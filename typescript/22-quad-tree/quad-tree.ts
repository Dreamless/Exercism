import {Node} from "./trees.js"

function makeNode(topLeft: Node, topRight: Node, bottomLeft: Node, bottomRight: Node): Node {
  const isAllLeaf: boolean = topLeft.isLeaf && topRight.isLeaf && bottomLeft.isLeaf && bottomRight.isLeaf;
  const isAllSame: boolean = topLeft.val === topRight.val && topLeft.val === bottomLeft.val && topLeft.val === bottomRight.val;

  if (isAllLeaf && isAllSame) {
    return new Node(topLeft.val, true)
  } else {
    return new Node(true, false, topLeft, topRight, bottomLeft, bottomRight);
  }
}

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

    return makeNode(topLeft, topRight, bottomLeft, bottomRight)
  }

  return buildTree(0, 0, grid.length);
}

export function constructBottomUp(grid: number[][]): Node {
  let size: number = grid.length;
  const nodes: Node[][] = [];

  for (let i = 0; i < size; i++) {
    const row: Node[] = [];
    for (let j = 0; j < size; j++) {
      row.push(new Node(Boolean(grid[i][j]), true))
    }
    nodes.push(row)
  }

  while (size > 1) {
    const newSize = size / 2;
    for (let row = 0; row < newSize; row++) {
      for (let col = 0; col < newSize; col++) {
        const topLeft: Node = nodes[row * 2][col * 2];
        const topRight: Node = nodes[row * 2][col * 2 + 1];
        const bottomLeft: Node = nodes[row * 2 + 1][col * 2];
        const bottomRight: Node = nodes[row * 2 + 1][col * 2 + 1];

        nodes[row][col] = makeNode(topLeft, topRight, bottomLeft, bottomRight)
      }
    }

    size = newSize;
  }

  return nodes[0][0];
}
