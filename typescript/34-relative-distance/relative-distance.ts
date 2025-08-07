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

  function getAncestors(person: string): Map<string, number> {
    const ancestors = new Map<string, number>();
    const queue: [string, number][] = [[person, 0]];

    while (queue.length > 0) {
      const [current, depth] = queue.shift()!;
      if (!ancestors.has(current)) {
        ancestors.set(current, depth);

        const parent = childToParent[current];
        if (parent) {
          queue.push([parent, depth + 1]);
        }
      }
    }

    return ancestors;
  }

  const aAncestors: Map<string, number> = getAncestors(personA);
  const bAncestors: Map<string, number> = getAncestors(personB);

  let minDistance = -1;

  for (const [ancestor, aDist] of aAncestors) {
    if (bAncestors.has(ancestor)) {
      const bDist = bAncestors.get(ancestor)!;
      const totalDistance = aDist + bDist - 1;
      if (minDistance === -1 || totalDistance < minDistance) {
        minDistance = totalDistance;
      }
    }
  }

  return minDistance;
}
