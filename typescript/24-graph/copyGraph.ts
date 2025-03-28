type Graph = Record<number, number[]>;

export class Node {
  value: number;
  neighbors: Node[];

  constructor(value: number) {
    this.value = value;
    this.neighbors = [];
  }
}

/*
  Write a function, copyGraph, that takes in a reference to a variable node
  which is part of an undirected, connected graph. The function should return
  a copy of the graph as an adjacency list in dictionary form.
  The keys of the adjacency list are the values of the nodes,
  and the values are the neighbors of the nodes.
*/

export function copyGraph(node: Node | null): Graph {
  const adjacencyList: Graph = {};

  function dfs(current: Node): void {
    if (current.value in adjacencyList) return;

    adjacencyList[current.value] = current.neighbors.map(n => n.value);

    for (const neighbor of current.neighbors) {
      dfs(neighbor);
    }
  }

  if (node) {
    dfs(node);
  }

  return adjacencyList;
}
