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
          new TreeNode(7, null, null),
          new TreeNode(2, null, null)
        ),
        null
      ),
      new TreeNode(
        8,
        new TreeNode(13, null, null),
        new TreeNode(
          4,
          new TreeNode(1, null, null),
          null
        )
      )
    )
    expect(hasPathSum(root, 22)).toBe(true)
  })

  it('path sum not exists', () => {
    const root: TreeNode = new TreeNode(
      1,
      new TreeNode(2, null, null),
      new TreeNode(3, null, null)
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
    const root = new TreeNode(
      2,
      new TreeNode(1, null, null),
      new TreeNode(3, null, null)
    )
    expect(validateBST(root)).toBe(true)
  })

  it("invalid BST", () => {
    const root = new TreeNode(
      5,
      new TreeNode(1, null, null),
      new TreeNode(
        4,
        new TreeNode(3, null, null),
        new TreeNode(6, null, null)
      )
    )
    expect(validateBST(root)).toBe(false)
  })
})

describe('findTilt', () => {
  it("tilt tree", () => {
    const root = new TreeNode(
      4,
      new TreeNode(
        2,
        new TreeNode(3, null, null),
        new TreeNode(5, null, null)
      ),
      new TreeNode(
        9,
        null,
        new TreeNode(7, null, null)
      )
    )
    expect(findTilt(root)).toBe(15)
  })

  it("single tree", () => {
    const root = new TreeNode(1, null, null)
    expect(findTilt(root)).toBe(0)
  })

  it("empty tree", () => {
    expect(findTilt(null)).toBe(0)
  })
})

describe("longestUnivaluePath", () => {
  it("tree with a univalue path", () => {
    const root = new TreeNode(
      5,
      new TreeNode(
        4,
        new TreeNode(4, null, null),
        new TreeNode(4, null, null)
      ),
      new TreeNode(
        5,
        null,
        new TreeNode(5, null, null)
      )
    )
    expect(longestUnivaluePath(root)).toBe(2)
  })

  it("tree with all unique values", () => {
    const root = new TreeNode(
      1,
      new TreeNode(2, null, null),
      new TreeNode(3, null, null)
    )
    expect(longestUnivaluePath(root)).toBe(0)
  })

  it("long uniform tree", () => {
    const root = new TreeNode(
      1,
      new TreeNode(
        1,
        new TreeNode(1, null, null),
        new TreeNode(1, null, null)
      ),
      new TreeNode(
        1,
        new TreeNode(1, null, null),
        new TreeNode(1, null, null)
      )
    )
    expect(longestUnivaluePath(root)).toBe(4)
  })

  it("long uniform tree 2", () => {
    const root = new TreeNode(
      4,
      new TreeNode(
        4,
        new TreeNode(4, new TreeNode(4, null, null), null),
        new TreeNode(4, new TreeNode(4, null, null), null)
      ),
      null
    )
    expect(longestUnivaluePath(root)).toBe(4)
  })

  it("long uniform tree 3", () => {
    const root = new TreeNode(
      2,
      new TreeNode(
        4,
        new TreeNode(
          4,
          new TreeNode(4, new TreeNode(4, new TreeNode(4, null, null), null), null),
          new TreeNode(4, new TreeNode(4, new TreeNode(4, null, null), null), null)
        ),
        null
      ),
      new TreeNode(
        2,
        new TreeNode(2, new TreeNode(2, null, null), null),
        null
      )
    )
    expect(longestUnivaluePath(root)).toBe(6)
  })

  it("long uniform tree 4", () => {
    const root = new TreeNode(
      4,
      new TreeNode(
        4,
        new TreeNode(
          4,
          new TreeNode(
            4,
            new TreeNode(4, new TreeNode(4, new TreeNode(4, null, null), null), null),
            new TreeNode(4, new TreeNode(4, null, null), null)
          ),
          null
        ),
        null
      ),
      null
    )
    expect(longestUnivaluePath(root)).toBe(6)
  })
})

