import { describe, it, expect } from '@jest/globals'
import { hasPathSum } from "./path-sum.js"
import { TreeNode} from "./trees.js"

describe('Path sum', () => {
  it('case 1', () => {
    // Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
    const root = new TreeNode(5)

    root.left = new TreeNode(4)
    root.left.left = new TreeNode(11)
    root.left.left.left = new TreeNode(7)
    root.left.left.right = new TreeNode(2)

    root.right = new TreeNode(8)
    root.right.left = new TreeNode(13)
    root.right.right = new TreeNode(4)
    root.right.right.right = new TreeNode(1)


    expect(hasPathSum(root, 22)).toBeTruthy()
  })

  it('case 2', () => {
    // Input: root = [1,2,3], targetSum = 5
    const root = new TreeNode(1)
    root.left = new TreeNode(2)
    root.right = new TreeNode(3)


    expect(hasPathSum(root, 5)).toBeFalsy()
  })
})
