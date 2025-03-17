import {describe, expect, it} from "@jest/globals"
import {graphBFS, graphDFS, recursiveGraphDFS} from "./graph.js"
import {hasPath} from "./graphTasks.js"

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

  /* Write a function, hasPath, that takes in an object representing the adjacency list
   of a directed acyclic graph and two nodes (src, dst).
   The function should return a boolean indicating whether or not there exists
   a directed path between the source and destination nodes. */

  it('has path task', () => {
    const graphData = {
      f: ['g', 'i'],
      g: ['h'],
      h: [''],
      i: ['g', 'k'],
      j: ['i'],
      k: [],
    }

    expect(hasPath(graphData, 'f', 'k')).toBeTruthy()
    expect(hasPath(graphData, 'g', 'k')).toBeFalsy()
  })
})
