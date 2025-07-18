export function degreesOfSeparation(
  familyTree: Record<string, string[]>,
  personA: string,
  personB: string
): number {
  if (personA === personB) return 0;
  const graph: Record<string, Set<string>> = {};

  for (const parent in familyTree) {
    for (const child of familyTree[parent]) {
      if (!graph[parent]) graph[parent] = new Set();
      graph[parent].add(child);

      if (!graph[child]) graph[child] = new Set();
      graph[child].add(parent);
    }
  }

  const visited = new Set<string>();
  const queue: [string, number][] = [[personA, 0]];

  while (queue.length > 0) {
    const [current, distance] = queue.shift()!;

    if (current === personB) {
      return distance;
    }

    visited.add(current);

    for (const neighbor of graph[current]) {
      if (!visited.has(neighbor)) {
        queue.push([neighbor, distance + 1]);
        visited.add(neighbor);
      }
    }
  }

  return -1;
}
