import { node } from './node.js';
export class binaryTree {
  // root of the tree this is the first node
  #root;
  constructor(sortedArray) {
    this.#root = null;
    this.#buildTree(sortedArray, 0, sortedArray.length - 1);
  }

  #buildTree(array, start, end, root = this.#root) {
    if (start > end) return null;
    let mid = start + (end - start) / 2;
    root = new node(array[mid]);
    this.#buildTree(array, start, mid - 1, root.leftNode);
    this.#buildTree(array, mid + 1, end, root.rightNode);
  }
}
