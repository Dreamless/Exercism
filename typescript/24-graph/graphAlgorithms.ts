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

  function explore(node: string): void {
    if (visited.has(node)) return;
    visited.add(node);
    for (const neighbor of graph[node] || []) {
      explore(neighbor.toString());
    }
  }

  for (const node in graph) {
    if (!visited.has(node)) {
      explore(node);
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

  for (const node in graph) {
    const size: number = exploreSize(graph, String(node), visited);
    if (size > longest) longest = size;
  }

  return longest;
}

function exploreSize(graph: NumberGraph, node: string, visited: Set<string>): number {
  if (visited.has(node)) return 0;
  visited.add(node);

  let size = 1;
  for (const neighbor of graph[node]) {
    size += exploreSize(graph, String(neighbor), visited)
  }

  return size;
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
  const queue: [string, number][] = [[nodeA, 0]];

  while (queue.length > 0) {
    const [node, distance] = queue.shift()!;

    if (node === nodeB) return distance;

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, distance + 1]);
      }
    }
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

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const size = exploreIsland(grid, row, col, visited);
      if (size > 0) {
        islands.push(size)
      }
    }
  }

  return islands;
}

function exploreIsland(grid: Grid, row: number, col: number, visited: Set<string>): number {
  const rowBounds: boolean = 0 <= row && row < grid.length;
  const colBounds: boolean = 0 <= col && col < grid[0].length;

  if (!rowBounds || !colBounds) return 0;
  if (grid[row][col] === "W") return 0;

  const position = `${row},${col}`;
  if (visited.has(position)) return 0;
  visited.add(position);

  let size = 1;

  size += exploreIsland(grid, row - 1, col, visited);
  size += exploreIsland(grid, row + 1, col, visited);
  size += exploreIsland(grid, row, col - 1, visited);
  size += exploreIsland(grid, row, col + 1, visited);

  return size;
}
