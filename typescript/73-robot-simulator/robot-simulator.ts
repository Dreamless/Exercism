export class InvalidInputError extends Error {
  constructor(message: string) {
    super()
    this.message = message || 'Invalid Input'
  }
}

type Direction = 'north' | 'east' | 'south' | 'west'
type Coordinates = [number, number]

const VALID_DIRECTIONS: Direction[] = ['north', 'east', 'south', 'west']

export class Robot {
  private _bearing: Direction = 'north'
  private _coordinates: Coordinates = [0, 0]

  get bearing(): Direction {
    return this._bearing
  }

  get coordinates(): Coordinates {
    return [this._coordinates[0], this._coordinates[1]]
  }

  place({x, y, direction}: { x: number; y: number; direction: string }): void {
    if (!VALID_DIRECTIONS.includes(direction as Direction)) {
      throw new InvalidInputError('Invalid direction')
    }
    this._coordinates = [x, y]
    this._bearing = direction as Direction
  }

  evaluate(instructions: string): void {
    for (const command of instructions) {
      const [x, y] = this._coordinates
      switch (command) {
        case 'R':
          this._turnRight()
          break
        case 'L':
          this._turnLeft()
          break
        case 'A':
          switch (this._bearing) {
            case 'north':
              this._coordinates = [x, y + 1]
              break
            case 'east':
              this._coordinates = [x + 1, y]
              break
            case 'south':
              this._coordinates = [x, y - 1]
              break
            case 'west':
              this._coordinates = [x - 1, y]
              break
          }
          break;
      }
    }
  }

  private _turnRight(): void {
    switch (this._bearing) {
      case 'north':
        this._bearing = 'east'
        break
      case 'east':
        this._bearing = 'south'
        break
      case 'south':
        this._bearing = 'west'
        break
      case 'west':
        this._bearing = 'north'
        break
    }
  }

  private _turnLeft(): void {
    switch (this._bearing) {
      case 'north':
        this._bearing = 'west'
        break
      case 'west':
        this._bearing = 'south'
        break
      case 'south':
        this._bearing = 'east'
        break
      case 'east':
        this._bearing = 'north'
        break
    }
  }
}
