type Graph = Record<string, string[]>

export function hasPath(graph: Graph, src: string, dst: string): boolean {
  if (src === dst) return true;

  for (const neighbor of graph[src] || []) {
    if (hasPath(graph, neighbor, dst)) {
      return true;
    }
  }

  return false;
}
