import { describe, it, expect } from '@jest/globals'
import { hasPathSum } from "./examples.js"
import { TreeNode } from "./trees.ts"

describe('hasPathSum', () => {
  it('path sum exists', () => {
    const root: TreeNode = new TreeNode(
      5,
      new TreeNode(
        4,
        new TreeNode(
          11,
          new TreeNode(7),
          new TreeNode(2)
        )
      ),
      new TreeNode(
        8,
        new TreeNode(13),
        new TreeNode(
          4,
          new TreeNode(1)
        )
      )
    )

    expect(hasPathSum(root, 22)).toBe(true)
  })

  it('path sum not exists', () => {
    const root: TreeNode = new TreeNode(
      1,
      new TreeNode(2),
      new TreeNode(3)
    )

    expect(hasPathSum(root, 10)).toBe(false)
  })

  it('test for null tree', () => {
    const root = null
    expect(hasPathSum(root, 1)).toBe(false)
  })
})
