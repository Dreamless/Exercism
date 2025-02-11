import { describe, it, expect } from '@jest/globals'
import { isSameTree, TreeNode } from "./same-tree.js";

describe('Same tree', () => {
  it('same trees', () => {
    // Input: p = [1,2,3], q = [1,2,3]
    const rootP = new TreeNode(1)
    rootP.left = new TreeNode(2)
    rootP.right = new TreeNode(3)

    const rootQ = new TreeNode(1)
    rootQ.left = new TreeNode(2)
    rootQ.right = new TreeNode(3)

    expect(isSameTree(rootP, rootQ)).toBeTruthy()
  })

  it('second test case', () => {
    // Input: p = [1,2], q = [1,null,2]
    const rootP = new TreeNode(1)
    rootP.left = new TreeNode(2)

    const rootQ = new TreeNode(1)
    rootQ.left = null
    rootQ.right = new TreeNode(2)

    expect(isSameTree(rootP, rootQ)).toBeFalsy()
  })
})
