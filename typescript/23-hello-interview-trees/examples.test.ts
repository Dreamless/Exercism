import { describe, it, expect } from '@jest/globals'
import { validateBST, hasPathSum, findTilt, longestUnivaluePath } from "./examples.js"
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


describe('validate BST', () => {
  it("valid BST", () => {
    const root = new TreeNode(2, new TreeNode(1), new TreeNode(3))
    expect(validateBST(root)).toBe(true)
  })

  it("invalid BST", () => {
    const root = new TreeNode(5, new TreeNode(1), new TreeNode(4, new TreeNode(3), new TreeNode(6)))
    expect(validateBST(root)).toBe(false)
  })
})

describe('findTilt', () => {
  it("tilt tree", () => {
    const root = new TreeNode(4,
      new TreeNode(2, new TreeNode(3), new TreeNode(5)),
      new TreeNode(9, null, new TreeNode(7))
    )
    expect(findTilt(root)).toBe(15)
  })

  it("single tree", () => {
    const root = new TreeNode(1)
    expect(findTilt(root)).toBe(0)
  })

  it("empty tree", () => {
    expect(findTilt(null)).toBe(0)
  })
})


describe("longestUnivaluePath", () => {
  it("tree with a univalue path", () => {
    const root = new TreeNode(5,
      new TreeNode(4, new TreeNode(4), new TreeNode(4)),
      new TreeNode(5, null, new TreeNode(5))
    )
    expect(longestUnivaluePath(root)).toBe(2)
  })

  it("tree with all unique values", () => {
    const root = new TreeNode(1,
      new TreeNode(2),
      new TreeNode(3)
    )
    expect(longestUnivaluePath(root)).toBe(0)
  })

  it("long uniform tree", () => {
    const root = new TreeNode(1,
      new TreeNode(1, new TreeNode(1), new TreeNode(1)),
      new TreeNode(1, new TreeNode(1), new TreeNode(1))
    )
    expect(longestUnivaluePath(root)).toBe(4)
  })
})
