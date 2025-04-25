import { describe, it, expect } from '@jest/globals'
import { maze_solver } from "./maze-solver.js"

describe('Maze solver', () => {
  const maze: string[] = [
    "xxxxxxxxxx x",
    "x        x x",
    "x        x x",
    "x xxxxxxxx x",
    "x          x",
    "x xxxxxxxxxx",
  ]

  it('generates keys at random', () => {
    expect(maze_solver(maze, "x", { x: 10, y: 0 }, { x: 1, y: 5 })).toEqual(1)
  })
})
