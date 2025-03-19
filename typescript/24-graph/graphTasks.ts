type Graph = Record<string, string[]>
type EdgeList = string[][];
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

export function undirectedPath(edges: EdgeList, nodeA: string, nodeB: string): boolean {
  const graph = buildGraph(edges);
  return hasPath(graph, nodeA, nodeB, new Set());
}

function buildGraph(edges: EdgeList): Graph {
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
