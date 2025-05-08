import {describe, it, expect} from '@jest/globals'
import {maze_solver} from "./maze-solver.js"

describe('Maze solver', () => {
  it('solves passage through a long maze', () => {
    const maze: string[] = [
      "xxxxxxxxxx x",
      "x        x x",
      "x        x x",
      "x xxxxxxxx x",
      "x          x",
      "x xxxxxxxxxx",
    ]

    const expected: { x: number, y: number }[] = [
      {"x": 10, "y": 0},
      {"x": 10, "y": 1},
      {"x": 10, "y": 2},
      {"x": 10, "y": 3},
      {"x": 10, "y": 4},
      {"x": 9, "y": 4},
      {"x": 8, "y": 4},
      {"x": 7, "y": 4},
      {"x": 6, "y": 4},
      {"x": 5, "y": 4},
      {"x": 4, "y": 4},
      {"x": 3, "y": 4},
      {"x": 2, "y": 4},
      {"x": 1, "y": 4},
      {"x": 1, "y": 5}
    ]

    const start = {x: 10, y: 0}
    const end = {x: 1, y: 5}

    expect(maze_solver(maze, "x", start, end)).toEqual(expected)
  })

  it('solves a minimal 2x2 maze', () => {
    const maze: string[] = [
      " *",
      " *"
    ]

    const start = {x: 0, y: 0}
    const end = {x: 0, y: 1}

    const expected: { x: number, y: number }[] = [
      {"x": 0, "y": 0},
      {"x": 0, "y": 1}
    ]

    expect(maze_solver(maze, "*", start, end)).toEqual(expected)
  })

  it('no path exists to the end', () => {
    const maze: string[] = [
      "| ||||||||",
      "| ||||||||",
      "||||||||||",
      "| ||||||||",
    ]

    const start = {x: 1, y: 0}
    const end = {x: 1, y: 2}

    expect(maze_solver(maze, "|", start, end)).toEqual([])
  })
})
