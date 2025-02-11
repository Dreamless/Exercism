import { describe, it, expect } from '@jest/globals'
import { _Node, maxDepth } from "./max-depth.js"

describe('Maximum Depth of N-ary Tree', () => {
  it('first test case', () => {
    // input [1,null,3,2,4,null,5,6]
    const root = new _Node(1)
    const node3 = new _Node(3)
    const node2 = new _Node(2)
    const node4 = new _Node(4)
    const node5 = new _Node(5)
    const node6 = new _Node(6)

    root.children.push(node3, node2, node4)
    node3.children.push(node5, node6)

    expect(maxDepth(root)).toEqual(3)
  })

  it('second test case', () => {
    // [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
    const root = new _Node(1)
    const node2 = new _Node(2)
    const node3 = new _Node(3)
    const node4 = new _Node(4)
    const node5 = new _Node(5)
    const node6 = new _Node(6)
    const node7 = new _Node(7)
    const node8 = new _Node(8)
    const node9 = new _Node(9)
    const node10 = new _Node(10)
    const node11 = new _Node(11)
    const node12 = new _Node(12)
    const node13 = new _Node(13)
    const node14 = new _Node(14)

    root.children.push(node2, node3, node4, node5)

    node3.children.push(node6, node7)
    node7.children.push(node11)
    node11.children.push(node14)

    node4.children.push(node8)
    node8.children.push(node12)

    node5.children.push(node9, node10)
    node9.children.push(node13)


    expect(maxDepth(root)).toEqual(5)
  })
})
