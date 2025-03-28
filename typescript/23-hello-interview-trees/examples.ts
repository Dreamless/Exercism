import { TreeNode } from "./trees.ts";

/*
  Given the root of a binary tree and an integer target,
  write a recursive function to determine if the tree has
  a root-to-leaf path where all the values along that path sum to the target.
*/

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

/*
  Given the root of a binary, write a recursive function
  to determine if it is a valid binary search tree.
*/

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

/*
  Given the root node of a binary tree, write a recursive function
  to return the sum of each node's tilt.
  The tilt of a node is the absolute difference between the sum of its left
  subtree and the sum of its right subtree. If a node has an empty left or subtree,
  the sum of the empty subtree is 0.
 */

export function findTilt(root: TreeNode | null): number {
  let tilt = 0;

  function dfs(node: TreeNode | null): number {
    if (!node) return 0;

    const left = dfs(node.left);
    const right = dfs(node.right);

    tilt += Math.abs(left - right);

    return left + right + node.val;
  }

  dfs(root);
  return tilt;
}

/*
  Given the root of the binary tree, find the longest path where all nodes
  along the path have the same value. This path doesn't have to include the root node.
  Return the number of edges on that path, not the number of nodes.
*/

export function longestUnivaluePath(root: TreeNode | null): number {
  let maxLength = 0;

  function dfs(node: TreeNode | null): number {
    if (!node) return 0;

    const leftLength = dfs(node.left);
    const rightLength = dfs(node.right);

    let leftArrow = 0, rightArrow = 0;

    if (node.left && node.left.val === node.val) {
      leftArrow = leftLength + 1;
    }

    if (node.right && node.right.val === node.val) {
      rightArrow = rightLength + 1;
    }

    maxLength = Math.max(maxLength, leftArrow + rightArrow);

    return Math.max(leftArrow, rightArrow);
  }

  dfs(root);

  return maxLength;
}
