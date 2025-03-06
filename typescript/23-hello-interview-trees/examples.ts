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


export function validateBST(root: TreeNode | null): boolean {
  const dfs = (node: TreeNode | null, min: number, max: number): boolean => {
    if (node === null) {
      return true;
    }

    if (node.val <= min || node.val >= max) {
      return false;
    }

    return dfs(node.left, min, node.val) && dfs(node.right, node.val, max);
  };

  return dfs(root, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
}


export function findTilt(root: TreeNode | null): number {
  let tilt = 0;

  const dfs = (node: TreeNode | null): number => {
    if (node === null) {
      return 0;
    }

    const left = dfs(node.left);
    const right = dfs(node.right);

    return 0;
  };

  dfs(root);

  return tilt;
}
