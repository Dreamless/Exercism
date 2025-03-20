import {describe, expect, it} from "@jest/globals"
import {graphBFS, graphDFS, recursiveGraphDFS} from "./graph.js"
import {hasPath, undirectedPath, connectedComponentsCount, largestComponent, shortestPath} from "./graphTasks.js"

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
    const edges = [
      ['w', 'x'],
      ['x', 'y'],
      ['z', 'y'],
      ['z', 'v'],
      ['w', 'v']
    ]
    expect(shortestPath(edges, 'w', 'z')).toEqual(2)
  })
})
