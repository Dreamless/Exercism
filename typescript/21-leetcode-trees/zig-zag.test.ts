import { describe, it, expect } from '@jest/globals'
import { zigzagLevelOrder } from "./zig-zag.js"
import { TreeNode } from "./trees.js"

describe('Zigzag Level Order Traversal', () => {
  it('first test case', () => {
    const expected: number[][] = [[1], [20, 9], [15, 7]]
    const root = new TreeNode(1)
    root.left = new TreeNode(9)
    root.right = new TreeNode(20)

    root.right.left = new TreeNode(15)
    root.right.right = new TreeNode(7)


    expect(zigzagLevelOrder(root)).toEqual(expected)
  })
})
