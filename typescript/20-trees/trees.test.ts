import { describe, it, expect } from '@jest/globals'
import {bfs, preorderDFS, iterativeDFS, TreeNode} from "./trees.js"

const exampleTree = new TreeNode(1)
const nodeLeft: TreeNode = exampleTree.addChild(2)
const nodeRight: TreeNode = exampleTree.addChild(3)
nodeLeft.addChild(4)
nodeLeft.addChild(5)
nodeLeft.addChild(6).addChild(6)
nodeLeft.addChild(7)
nodeRight.addChild(8)
nodeRight.addChild(9)

const exampleTree2 = new TreeNode(1)
const nodeLeft2: TreeNode = exampleTree2.addChild(2)
const nodeRight2: TreeNode = exampleTree2.addChild(3)
nodeLeft2.addChild(4)
nodeLeft2.addChild(5)
nodeRight2.addChild(6)


const expectedTree = {
  children: [
    {
      children: [
        { children: [], value: 4 },
        { children: [], value: 5 },
        {
          children: [
            { children: [], value: 6 }
          ],
          value: 6
        },
        { children: [], value: 7 }
      ],
      value: 2
    },
    {
      children: [
        { children: [], value: 8 },
        { children: [], value: 9 }
      ],
      value: 3
    }
  ],
  value: 1
}

describe('Trees', () => {
  it('create tree', () => {
    expect(exampleTree).toEqual(expectedTree)
  })

  it('bfs', () => {
    const expected: number[] = [1,2,3,4,5,6,7,8,9,6]
    expect(bfs(exampleTree)).toEqual(expected)
  })

  it('dfs', () => {
    const expected: number[] = [1,2,3,4,5,6,7,8,9,6]
    expect(iterativeDFS(exampleTree2)).toEqual(expected)
  })

})
