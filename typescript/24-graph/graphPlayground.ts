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
  traversal(graph, source, result);
  return result;
}

function traversal(graph: Graph, s: string, result: string[]): void {
  result.push(s);
  for (const neighbor of graph[s]) {
    traversal(graph, neighbor, result);
  }
}

export function graphBFS(graph: Graph, source: string): string[] {
  let currentLevel: string[] = [source];
  const result: string[] = [];
  while (currentLevel.length > 0) {
    let nextLevel: string[] = [];

    for (const node of currentLevel) {
      result.push(node);
      nextLevel = nextLevel.concat(graph[node])
    }

    currentLevel = nextLevel;
  }

  return result;
}
