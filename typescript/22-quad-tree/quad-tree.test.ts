import { describe, it, expect } from '@jest/globals'
import { construct } from "./quad-tree.js"
import { Node } from "./trees.js"

const expected: Node = new Node(
  true,
  false,
  new Node(false, true),
  new Node(true, true),
  new Node(true, true),
  new Node(false, true),
)

describe('Quad tree', () => {
  it('simple grid', () => {
    const grid: number[][] = [[0,1],[1,0]]
    expect(construct(grid)).toEqual(expected)
  })
})
