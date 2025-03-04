import {describe, it, expect} from '@jest/globals'
import {construct} from "./quad-tree.js"
import {Node} from "./trees.js"

describe('Quad tree', () => {
  it('simple grid', () => {
    const grid: number[][] = [[0, 1], [1, 0]]
    const expected: Node = new Node(
      true,
      false,
      new Node(false, true),
      new Node(true, true),
      new Node(true, true),
      new Node(false, true)
    )

    expect(construct(grid)).toEqual(expected)
  })

  it('complex grid', () => {
    const grid: number[][] = [
      [1, 1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0]
    ]
    const expected: Node = new Node(
      true,
      false,
      new Node(true, true),
      new Node(
        true,
        false,
        new Node(false, true),
        new Node(false, true),
        new Node(true, true),
        new Node(true, true)
      ),
      new Node(true, true),
      new Node(false, true)
    )

    expect(construct(grid)).toEqual(expected)
  })

  it('uniform grid of 1', () => {
    const grid: number[][] = [[1, 1], [1, 1]]
    const expected: Node = new Node(true, true)

    expect(construct(grid)).toEqual(expected)
  })

  it('uniform grid of 0', () => {
    const grid: number[][] = [[0, 0], [0, 0]]
    const expected: Node = new Node(false, true)

    expect(construct(grid)).toEqual(expected)
  })

  it('mixed values', () => {
    const grid: number[][] = [
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 1, 1],
      [0, 0, 1, 1]
    ]
    const expected: Node = new Node(
      true,
      false,
      new Node(true, true),
      new Node(false, true),
      new Node(false, true),
      new Node(true, true)
    )

    expect(construct(grid)).toEqual(expected)
  })
})
