import { TreeNode } from "./trees.ts";

export function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  if (!root) return false;

  if (!root.left && !root.right) {
    return root.val === targetSum;
  }

  const sum = targetSum - root.val;

  return hasPathSum(root.left, sum) || hasPathSum(root.right, sum);
}
