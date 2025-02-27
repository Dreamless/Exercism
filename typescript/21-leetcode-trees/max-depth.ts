import { _Node } from "./trees.js";

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

