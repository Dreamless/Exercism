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

      if (leftToRight) {
        lvl.push(node.val);
      } else {
        lvl.unshift(node.val);
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(lvl);

    leftToRight = !leftToRight;
  }

  return result;
}
