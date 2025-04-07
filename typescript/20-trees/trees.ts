export class TreeNode {
  value: number;
  children: TreeNode[];

  constructor(value: number) {
    this.value = value;
    this.children = [];
  }

  addChild(value: number): TreeNode {
    const newNode = new TreeNode(value);
    this.children.push(newNode);
    return newNode;
  }
}

export function bfs(root: TreeNode): number[] {
  if (!root) return [];

  const result: number[] = [];
  let queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const currentLevel: TreeNode[] = queue;
    queue = [];

    for (const node of currentLevel) {
      result.push(node.value);
      queue.push(...node.children);
    }
  }

  return result;
}


export function preorderDFS(node: TreeNode, result: number[] = []): number[] {
  if (!node) return result;

  result.push(node.value);

  for (const child of node.children) {
    preorderDFS(child, result);
  }

  return result;
}


export function iterativeDFS(root: TreeNode): number[] {
  if (!root) return [];

  const result: number[] = [];
  const stack: TreeNode[] = [root];

  while (stack.length > 0) {
    const node = stack.pop()!;
    result.push(node.value);

    for (let i = node.children.length - 1; i >= 0; i--) {
      stack.push(node.children[i]);
    }
  }

  return result;
}
