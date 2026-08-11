import { node } from './node.js';
export class binaryTree {
  // root of the tree this is the first node
  #root;
  constructor(sortedArray) {
    this.#root = this.#buildTree(
      sortedArray,
      0,
      sortedArray.length - 1,
      this.#root
    );
  }

  #buildTree(array, start, end, root) {
    if (start > end) return null;
    let mid = start + Math.floor((end - start) / 2);
    root = new node(array[mid]);
    root.leftNode = this.#buildTree(array, start, mid - 1, root.leftNode);
    root.rightNode = this.#buildTree(array, mid + 1, end, root.rightNode);
    return root;
  }
  prettyPrint = (node = this.#root, prefix = '', isLeft = true) => {
    if (node === null || node === undefined) {
      return;
    }

    this.prettyPrint(
      node.rightNode,
      `${prefix}${isLeft ? '│   ' : '    '}`,
      false
    );
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.nodeValue}`);
    this.prettyPrint(
      node.leftNode,
      `${prefix}${isLeft ? '    ' : '│   '}`,
      true
    );
  };
  includes(value) {
    let currentNode = this.#root;
    while (currentNode !== null) {
      if (currentNode.nodeValue === value) return true;
      if (currentNode.nodeValue > value) currentNode = currentNode.leftNode;
      if (currentNode.nodeValue < value) currentNode = currentNode.rightNode;
    }
    return false;
  }
}
