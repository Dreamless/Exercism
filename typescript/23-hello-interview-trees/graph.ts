type Graph = Record<string, string[]>

export function graphDFS(graph: Graph, source: string): string[] {
  const stack: string[] = [source];
  const result: string[] = [];

  while (stack.length > 0) {
    const curr: string = stack.pop()!;
    result.push(curr);
    for (const neighbor of graph[curr]) {
      stack.push(neighbor);
    }
  }

  return result;
}

export function recursiveGraphDFS(graph: Graph, source: string): string[] {
  const result: string[] = [];

  function traversal(g: Graph, s: string): void {
    result.push(s);
    for (const neighbor of graph[s]) {
      traversal(g, neighbor)
    }
  }

  traversal(graph, source)


  return result;
}

export function graphBFS(graph: Graph, source: string): string[] {
  const queue: string[] = [source];
  const result: string[] = [];
  while (queue.length > 0) {
    const curr: string = queue.shift()!;
    result.push(curr);
    for (const neighbor of graph[curr]) {
      queue.push(neighbor);
    }
  }
  return result;
}
