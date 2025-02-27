import { TreeNode} from "./trees.js"


export function zigzagLevelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const result: number[][] = [];
  const queue: TreeNode[] = [root];

  let leftToRight = true;

  while (queue.length) {
    const lvlAmount = queue.length;
    const lvl: number[] = [];

    for (let i = 0; i < lvlAmount; i++) {
      const node: TreeNode = queue.shift()!;

      lvl.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    if (!leftToRight) {
      lvl.reverse();
    }

    result.push(lvl);

    leftToRight = !leftToRight;
  }

  return result;
}


export function zigzagLevelOrderDFS(root: TreeNode | null): number[][] {
  const result: number[][] = [];

  function dfs(node: TreeNode | null, lvl: number): void {
    if (!node) return;

    if (result.length === lvl) {
      result.push([]);
    }

    result[lvl].push(node.val);

    dfs(node.left, lvl + 1);
    dfs(node.right, lvl + 1);
  }

  dfs(root, 0);

  for (let i = 1; i < result.length; i++) {
    if (i % 2 !== 0) {
      result[i].reverse();
    }
  }

  return result;
}
