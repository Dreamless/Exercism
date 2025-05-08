type Point = {
  x: number;
  y: number;
};

const DIRECTIONS: [number, number][] = [
  [1, 0],
  [0, 1],
  [0, -1],
  [-1, 0],
];

function walk(
  maze: string[],
  wall: string,
  curr: Point,
  end: Point,
  seen: boolean[][],
  path: Point[]
): boolean {
  if (
    curr.x < 0 ||
    curr.x >= maze[0].length ||
    curr.y < 0 ||
    curr.y >= maze.length
  )
    return false;

  if (maze[curr.y][curr.x] === wall) return false;

  if (curr.x === end.x && curr.y === end.y) {
    path.push(end);
    return true;
  }

  if (seen[curr.y][curr.x]) return false;

  seen[curr.y][curr.x] = true;
  path.push(curr);

  for (let i = 0; i < DIRECTIONS.length; i++) {
    const [x, y] = DIRECTIONS[i];
    const newCurr = { x: curr.x + x, y: curr.y + y };

    if (walk(maze, wall, newCurr, end, seen, path)) return true;
  }

  path.pop();

  return false;
}

/**
 * Solves a 2D grid-based maze by finding a path
 * from a starting point to an ending point while avoiding obstacles (walls).
 *
 * @param {string[]} maze An array of strings representing a 2D matrix
 * where each string is a row and each character represents a cell.
 * Any char might be passage except a wall character
 * Example:
 * [
 * "#####",
 * " # #",
 * "# ###",
 * "#  ##",
 * "# ###"
 * ]
 * @param {string} wall any single symbol (|, x, *) denoting a wall segment that cannot be passed through
 * @param {Point} start labyrinth entrance position coordinates
 * @param {Point} end labyrinth exit position coordinates
 * @return {Array[Point]} path from the passed coordinates to the exit
 */
export function maze_solver(
  maze: string[],
  wall: string,
  start: Point,
  end: Point
): Point[] {
  const seen: boolean[][] = [];
  const path: Point[] = [];

  for (let i = 0; i < maze.length; i++)
    seen.push(new Array<boolean>(maze[0].length).fill(false));

  walk(maze, wall, start, end, seen, path);

  return path;
}
