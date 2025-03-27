import { describe, it, expect } from '@jest/globals'
import {exampleTree, bfs, preorderDFS} from "./trees.js"
const expected: number[] = [1,2,3,4,5,6,7,8,9,6]

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
    expect(bfs(exampleTree)).toEqual(expected)
  })

  it('dfs preorder', () => {
    expect(preorderDFS(exampleTree)).toEqual(expected)
  })
})
