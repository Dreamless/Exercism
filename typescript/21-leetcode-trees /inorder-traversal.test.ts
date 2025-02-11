import { describe, it, expect } from '@jest/globals'
import { inorderTraversal } from "./inorder-traversal.js"
import { TreeNode } from "./trees.ts"

describe('Same tree', () => {
  it('first case', () => {
    const expected: number[] = [1,3,2]

    // Input: root = [1,null,2,3]
    const root = new TreeNode(1)

    root.right = new TreeNode(2)
    root.right.left = new TreeNode(3)

    expect(inorderTraversal(root)).toEqual(expected)
  })

  it('second case', () => {
    const expected: Array<number | null> = [4,2,6,5,7,1,3,9,8]

    // Input: root = [1,2,3,4,5,null,8,null,null,6,7,9]
    const root = new TreeNode(1)

    root.left = new TreeNode(2)
    root.left.left = new TreeNode(4)
    root.left.right = new TreeNode(5)
    root.left.right.left = new TreeNode(6)
    root.left.right.right = new TreeNode(7)

    root.right = new TreeNode(3)
    root.right.right = new TreeNode(8)
    root.right.right.left = new TreeNode(9)

    expect(inorderTraversal(root)).toEqual(expected)
  })
})
