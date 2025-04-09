import {describe, expect, it} from "@jest/globals"
import {graphBFS, graphDFS, recursiveGraphDFS} from "./graphPlayground.js"
import {
  hasPath,
  undirectedPath,
  connectedComponentsCount,
  largestComponent,
  shortestPath,
  islandCount,
  minimumIsland, floodFill,
} from "./graphAlgorithms.js"

import { copyGraph, Node } from "./copyGraph.js"

const numGraph = {
  0: [8, 1, 5],
  1: [0],
  2: [3, 4],
  3: [2, 4],
  4: [3, 2],
  5: [0, 8],
  8: [0, 5]
}

describe('Graph traversal', () => {
  it('test graph traversal', () => {
    const graphData = {
      a: ['c', 'b'],
      b: ['d'],
      c: ['e'],
      d: ['f'],
      e: [],
      f: [],
    }

    const expected1: string[] = ['a', 'b', 'd', 'f', 'c', 'e']
    const expected2: string[] = ['a', 'c', 'e', 'b', 'd', 'f']
    const expected3: string[] = ['a', 'c', 'b', 'e', 'd', 'f']

    expect(graphDFS(graphData, 'a')).toEqual(expected1)
    expect(recursiveGraphDFS(graphData, 'a')).toEqual(expected2)
    expect(graphBFS(graphData, 'a')).toEqual(expected3)
  })

  it('has path task', () => {
    const graphData = {
      f: ['g', 'i'],
      g: ['h'],
      h: [''],
      i: ['g', 'k'],
      j: ['i'],
      k: [],
    }

    expect(hasPath(graphData, 'f', 'k', new Set())).toBeTruthy()
    expect(hasPath(graphData, 'g', 'k', new Set())).toBeFalsy()
  })

  it('undirected path', () => {
    const edges = [
      ['i', 'j'],
      ['k', 'i'],
      ['m', 'k'],
      ['k', 'l'],
      ['o', 'n']
    ]

    expect(undirectedPath(edges, 'j', 'm')).toBeTruthy()
    expect(undirectedPath(edges, 'i', 'o')).toBeFalsy()
  })

  it('connected components count', () => {
    expect(connectedComponentsCount(numGraph)).toEqual(2)
  })

  it('largest component', () => {
    expect(largestComponent(numGraph)).toEqual(4)
  })

  it('shortest path', () => {
    const edges: string[][] = [
      ['w', 'x'],
      ['x', 'y'],
      ['z', 'y'],
      ['z', 'v'],
      ['w', 'v']
    ]
    expect(shortestPath(edges, 'w', 'z')).toEqual(2)
  })

  it('island traversal', () => {
    const grid: string[][] = [
      ['W', 'L', 'W', 'W', 'W'],
      ['W', 'L', 'W', 'W', 'W'],
      ['W', 'W', 'W', 'W', 'W'],
      ['W', 'W', 'W', 'L', 'L'],
      ['L', 'W', 'W', 'L', 'L'],
      ['L', 'L', 'W', 'W', 'W'],
    ]

    expect(islandCount(grid)).toEqual(3)
    expect(minimumIsland(grid)).toEqual(2)
  })

  it('copyGraph simple connected graph', () => {
    const node1 = new Node(1)
    const node2 = new Node(2)
    const node3 = new Node(3)

    node1.neighbors = [node2, node3]
    node2.neighbors = [node1]
    node3.neighbors = [node1]

    expect(copyGraph(node1)).toEqual({
      1: [2, 3],
      2: [1],
      3: [1]
    })
  })

  it('copyGraph with a cycle in the graph', () => {
    const nodeA = new Node(1)
    const nodeB = new Node(2)
    const nodeC = new Node(3)
    const nodeD = new Node(4)

    nodeA.neighbors = [nodeB, nodeD]
    nodeB.neighbors = [nodeA, nodeC]
    nodeC.neighbors = [nodeB, nodeD]
    nodeD.neighbors = [nodeA, nodeC]

    expect(copyGraph(nodeA)).toEqual({
      1: [2, 4],
      2: [1, 3],
      3: [2, 4],
      4: [1, 3]
    })
  })
})

describe('floodFill', () => {
  it('should fill the connected region with the new color', () => {
    const image = [
      [1, 1, 1],
      [1, 1, 0],
      [1, 0, 1],
    ]
    const sr = 1
    const sc = 1
    const color = 2

    const result = floodFill(image, sr, sc, color)

    expect(result).toEqual([
      [2, 2, 2],
      [2, 2, 0],
      [2, 0, 1],
    ])
  })

  it('should be the same as the original color', () => {
    const image = [
      [1, 1, 1],
      [1, 1, 0],
      [1, 0, 1],
    ]
    const sr = 1
    const sc = 1
    const color = 1

    const result = floodFill(image, sr, sc, color)

    expect(result).toEqual([
      [1, 1, 1],
      [1, 1, 0],
      [1, 0, 1],
    ])
  })
})
