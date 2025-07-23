export function degreesOfSeparation(
  familyTree: Record<string, string[]>,
  personA: string,
  personB: string
): number {
  if (personA === personB) return 0;

  const childToParent: Record<string, string> = {};
  for (const parent in familyTree) {
    for (const child of familyTree[parent]) {
      childToParent[child] = parent;
    }
  }

  const visited = new Set<string>();
  const queue: [string, number][] = [[personA, 0]];
  visited.add(personA);

  while (queue.length > 0) {
    const [current, distance] = queue.shift()!;

    const neighbors: string[] = [];
    const parent = childToParent[current];

    if (parent) {
      neighbors.push(parent);
    }

    if (familyTree[current]) {
      neighbors.push(...familyTree[current]);
    }

    if (parent && familyTree[parent]) {
      for (const sibling of familyTree[parent]) {
        if (sibling !== current) {
          neighbors.push(sibling);
        }
      }
    }

    for (const neighbor of neighbors) {
      if (neighbor === personB) {
        return distance + 1;
      }

      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, distance + 1]);
      }
    }
  }

  return -1;
}
