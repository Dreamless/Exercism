type Graph = Record<string, string[]>
type Grid = string[][];
type NumberGraph = Record<string, number[]>;

/*
  Write a function, hasPath, that takes in an object representing the adjacency list
  of a directed acyclic graph and two nodes (src, dst).
  The function should return a boolean indicating whether or not there exists
  a directed path between the source and destination nodes.
*/

export function hasPath(graph: Graph, src: string, dst: string, visited: Set<string>): boolean {
  if (src === dst) return true;
  if (visited.has(src)) return false;

  visited.add(src);

  for (const neighbor of graph[src] || []) {
    if (hasPath(graph, neighbor, dst, visited)) {
      return true;
    }
  }

  return false;
}

/*
  Write a function, undirectedPath, that takes in an array of edges
  for an undirected graph and two nodes (nodeA, nodeB).
  The function should return a boolean indicating whether or not
  there exists a path between nodeA and nodeB.
*/

export function undirectedPath(edges: Grid, nodeA: string, nodeB: string): boolean {
  const graph: Graph = buildGraph(edges);
  return hasPath(graph, nodeA, nodeB, new Set());
}

function buildGraph(edges: Grid): Graph {
  const graph: Graph = {};

  for (const [a, b] of edges) {
    if (!(a in graph)) graph[a] = [];
    if (!(b in graph)) graph[b] = [];

    graph[a].push(b);
    graph[b].push(a);
  }

  return graph;
}


/*
Write a function, connectedComponentsCount, that takes in the adjacency list of an undirected graph.
The function should return the number of connected components within the graph.
*/

export function connectedComponentsCount(graph: NumberGraph): number {
  const visited = new Set<string>();
  let count = 0;

  for (const node in graph) {
    if (explore(graph, node, visited)) {
      count++;
    }
  }

  return count;
}

/*
  Write a function, largestComponent, that takes in the adjacency list of an undirected graph.
  The function should return the size of the largest connected component in the graph.
*/

export function largestComponent(graph: NumberGraph): number {
  let longest = 0;
  const visited = new Set<string>();
  let prevSize = 0

  for (const node in graph) {
    if (explore(graph, node, visited)) {
      const islandSize = visited.size - prevSize;
      prevSize = visited.size;

      if (islandSize > longest) longest = islandSize;
    }

  }

  return longest;
}

function explore(graph: NumberGraph, node: string, visited: Set<string>): boolean {
  if (visited.has(node)) return false;
  visited.add(node);

  for (const neighbor of graph[node]) {
   explore(graph, String(neighbor), visited)
  }

  return true;
}

/*
  Write a function, shortestPath, that takes in an array of edges
  for an undirected graph and two nodes (nodeA, nodeB).
  The function should return the length of the shortest path between A and B.
  Consider the length as the number of edges in the path, not the number of nodes.
  If there is no path between A and B, then return -1.
*/

export function shortestPath(edges: Grid, nodeA: string, nodeB: string): number {
  const graph: Graph = buildGraph(edges);
  const visited = new Set<string>([nodeA]);
  let currentLevel: string[] = [nodeA];
  let distance = 0;

  while (currentLevel.length > 0) {
    const nextLevel: string[] = []

    for (const node of currentLevel) {
      if (node === nodeB) return distance;

      for (const neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          nextLevel.push(neighbor);
        }
      }
    }

    distance++;
    currentLevel = nextLevel;
  }

  return -1;
}

/*
  Write a function, islandCount, that takes in a grid containing Ws and Ls.
  W represents water and L represents land. The function should return the
  number of islands on the grid. An island is a vertically or horizontally
  connected region of land.
*/

export function islandCount(grid: Grid): number {
  return islandTraversal(grid).length;
}

/*
  Write a function, minimumIsland, that takes in a grid containing Ws and Ls.
  W represents water and L represents land. The function should return the size
  of the smallest island. An island is a vertically or horizontally connected
  region of land. You may assume that the grid contains at least one island.
*/

export function minimumIsland(grid: Grid): number {
  return Math.min(...islandTraversal(grid));
}

function islandTraversal(grid: Grid): number[] {
  const visited = new Set<string>();
  const islands: number[] = [];
  let prevSize = 0

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (exploreIsland(grid, row, col, visited)) {
        const islandSize = visited.size - prevSize;
        prevSize = visited.size;
        islands.push(islandSize);
      }
    }
  }

  return islands;
}

function exploreIsland(grid: Grid, row: number, col: number, visited: Set<string>): boolean {
  const rowBounds: boolean = 0 <= row && row < grid.length;
  const colBounds: boolean = 0 <= col && col < grid[0].length;

  if (!rowBounds || !colBounds) return false;
  if (grid[row][col] === "W") return false;

  const position = `${row},${col}`;
  if (visited.has(position)) return false;
  visited.add(position);

  exploreIsland(grid, row - 1, col, visited);
  exploreIsland(grid, row + 1, col, visited);
  exploreIsland(grid, row, col - 1, visited);
  exploreIsland(grid, row, col + 1, visited);

  return true;
}

/*
  Given a m x n integer grid image and integers sr, sc, and newColor,
  write a function to perform a flood fill on the image starting from the pixel image[sr][sc].
  In a 'flood fill', start by changing the color of image[sr][sc] to newColor.
  Then, change the color of all pixels connected to image[sr][sc] from either
  the top, bottom, left or right that have the same color as image[sr][sc],
  along with all the connected pixels of those pixels, and so on.
*/

export function floodFill(image: number[][], sr: number, sc: number, color: number): number[][] {
  const rows: number = image.length;
  const cols: number = image[0].length;
  const originalColor: number = image[sr][sc];

  if (originalColor === color) {
    return image;
  }

  function exploreImage(r: number, c: number): void {
    if (image[r][c] === originalColor) {
      image[r][c] = color;
      if (r >= 1) exploreImage(r - 1, c);
      if (r + 1 < rows) exploreImage(r + 1, c);
      if (c >= 1) exploreImage(r, c - 1);
      if (c + 1 < cols) exploreImage(r, c + 1);
    }
  }

  exploreImage(sr, sc);

  return image;
}
