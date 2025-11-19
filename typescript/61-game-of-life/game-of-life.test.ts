import { describe, it, expect } from '@jest/globals'
import { GameOfLife } from './game-of-life.ts'

describe('Game of Life', () => {
  // Empty matrix
  it('empty matrix', () => {
    const matrix: number[][] = []
    const game = new GameOfLife(matrix)
    game.tick()
    const expected: number[][] = []
    expect(game.state()).toEqual(expected)
  })

  // Live cells with zero live neighbors die
  it('live cells with zero live neighbors die', () => {
    const matrix = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ]
    const game = new GameOfLife(matrix)
    game.tick()
    const expected = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]
    expect(game.state()).toEqual(expected)
  })

  // Live cells with only one live neighbor die
  it('live cells with only one live neighbor die', () => {
    const matrix = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 1, 0],
    ]
    const game = new GameOfLife(matrix)
    game.tick()
    const expected = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]
    expect(game.state()).toEqual(expected)
  })

  // Live cells with two live neighbors stay alive
  it('live cells with two live neighbors stay alive', () => {
    const matrix = [
      [1, 0, 1],
      [1, 0, 1],
      [1, 0, 1],
    ]
    const game = new GameOfLife(matrix)
    game.tick()
    const expected = [
      [0, 0, 0],
      [1, 0, 1],
      [0, 0, 0],
    ]
    expect(game.state()).toEqual(expected)
  })

  // Live cells with three live neighbors stay alive
  it('live cells with three live neighbors stay alive', () => {
    const matrix = [
      [0, 1, 0],
      [1, 0, 0],
      [1, 1, 0],
    ]
    const game = new GameOfLife(matrix)
    game.tick()
    const expected = [
      [0, 0, 0],
      [1, 0, 0],
      [1, 1, 0],
    ]
    expect(game.state()).toEqual(expected)
  })

  // Dead cells with three live neighbors become alive
  it('dead cells with three live neighbors become alive', () => {
    const matrix = [
      [1, 1, 0],
      [0, 0, 0],
      [1, 0, 0],
    ]
    const game = new GameOfLife(matrix)
    game.tick()
    const expected = [
      [0, 0, 0],
      [1, 1, 0],
      [0, 0, 0],
    ]
    expect(game.state()).toEqual(expected)
  })

  // Live cells with four or more neighbors die
  it('live cells with four or more neighbors die', () => {
    const matrix = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ]
    const game = new GameOfLife(matrix)
    game.tick()
    const expected = [
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1],
    ]
    expect(game.state()).toEqual(expected)
  })

  // Bigger matrix
  it('bigger matrix', () => {
    const matrix = [
      [1, 1, 0, 1, 1, 0, 0, 0],
      [1, 0, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 1, 1, 0],
      [1, 0, 0, 0, 1, 1, 0, 0],
      [1, 1, 0, 0, 0, 1, 1, 1],
      [0, 0, 1, 0, 1, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 1],
    ]
    const game = new GameOfLife(matrix)
    game.tick()
    const expected = [
      [1, 1, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 0],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 1, 0, 0, 1],
      [1, 1, 0, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1],
    ]
    expect(game.state()).toEqual(expected)
  })
})
