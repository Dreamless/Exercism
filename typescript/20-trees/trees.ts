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

export const exampleTree = new TreeNode(1);
const nodeLeft: TreeNode = exampleTree.addChild(2);
const nodeRight: TreeNode = exampleTree.addChild(3);
nodeLeft.addChild(4);
nodeLeft.addChild(5);
nodeLeft.addChild(6).addChild(6)
nodeLeft.addChild(7);
nodeRight.addChild(8)
nodeRight.addChild(9)

export function bfs(root: TreeNode): number[] {
  if (!root) return [];

  const result: number[] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node.value);

    if (node.children.length > 0) {
      queue.push(...node.children);
    }
  }

  return result;
}


export function preorderDFS(node: TreeNode | null, result: number[] = []): number[] {
  if (!node) return result;

  result.push(node.value);

  for (const child of node.children) {
    preorderDFS(child, result);
  }

  return result;
}
