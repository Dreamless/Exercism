export function degreesOfSeparation(
  familyTree: Record<string, string[]>,
  personA: string,
  personB: string
): number {
  if (personA === personB) return 0;
  const graph: Record<string, Set<string>> = {};

  for (const parent in familyTree) {
    const children: string[] = familyTree[parent];
    for (const child of children) {
      if (!graph[parent]) graph[parent] = new Set();
      graph[parent].add(child);
      if (!graph[child]) graph[child] = new Set();
      graph[child].add(parent);
    }

    for (let i = 0; i < children.length; i++) {
      for (let j = i + 1; j < children.length; j++) {
        const childA = children[i];
        const childB = children[j];
        if (!graph[childA]) graph[childA] = new Set();
        graph[childA].add(childB);
        if (!graph[childB]) graph[childB] = new Set();
        graph[childB].add(childA);
      }
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
