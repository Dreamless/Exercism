import { TreeNode } from "./trees.ts";

export function hasPathSum(root: TreeNode | null, target: number): boolean {
  if (!root) {
    return false;
  }

  if (!root.left && !root.right) {
    return target === root.val;
  }

  const left = hasPathSum(root.left, target - root.val);
  const right = hasPathSum(root.right, target - root.val);
  return left || right;
}
