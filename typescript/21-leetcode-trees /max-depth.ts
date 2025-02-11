export class _Node {
  val: number;
  children: _Node[];

  constructor(val?: number, children?: _Node[]) {
    this.val = val === undefined ? 0 : val;
    this.children = children === undefined ? [] : children;
  }
}


export function maxDepth(root: _Node | null): number {
  if (!root) return 0;

  let deepest = 0;
  for (const child of root.children) {
    const depth = maxDepth(child);
    if (depth > deepest) {
      deepest = depth;
    }
  }

  return 1 + deepest;
}

