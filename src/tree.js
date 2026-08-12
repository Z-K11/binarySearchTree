import { node } from './node.js';
export class binaryTree {
  // root of the tree this is the first node
  #root;

  // constructor builds the tree using an array
  constructor(sortedArray) {
    this.#root = this.#buildTree(
      sortedArray,
      0,
      sortedArray.length - 1,
      this.#root
    );
  }

  // recursively builds the binary tree using a provided sorted array
  #buildTree(array, start, end, root) {
    if (start > end) return null;
    let mid = start + Math.floor((end - start) / 2);
    root = new node(array[mid]);
    root.leftNode = this.#buildTree(array, start, mid - 1, root.leftNode);
    root.rightNode = this.#buildTree(array, mid + 1, end, root.rightNode);
    return root;
  }

  // prints the binary tree recursively
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

  // recursively searches for a value inside the tree if the value exists returns true
  includes(value) {
    let currentNode = this.#root;
    while (currentNode !== null) {
      if (currentNode.nodeValue === value) return true;
      if (currentNode.nodeValue > value) {
        if (currentNode.leftNode === null) return false;
        currentNode = currentNode.leftNode;
      }
      if (currentNode.nodeValue < value) {
        if (currentNode.rightNode === null) return false;
        currentNode = currentNode.rightNode;
      }
    }
    return false;
  }

  // insert given value into the tree
  insert(value) {
    if (this.#root === null) {
      this.#root = new node(value);
      return;
    } else this.#inserttraverse(value, this.#root);
  }

  // traverse the tree and insert value
  #inserttraverse(value, currentNode) {
    if (currentNode.nodeValue < value) {
      if (currentNode.rightNode === null) {
        currentNode.rightNode = new node(value);
        return;
      }
      this.#inserttraverse(value, currentNode.rightNode);
    } else if (currentNode.nodeValue > value) {
      if (currentNode.leftNode === null) {
        currentNode.leftNode = new node(value);
        return;
      }
      this.#inserttraverse(value, currentNode.leftNode);
    }
  }

  // remove the given value from the tree
  remove(value) {
    this.#root = this.#removeTraverse(value, this.#root);
  }

  // traverse the tree and remove node
  #removeTraverse(value, currentNode) {
    if (currentNode === null) return currentNode;
    if (value > currentNode.nodeValue)
      currentNode.rightNode = this.#removeTraverse(
        value,
        currentNode.rightNode
      );
    else if (value < currentNode.nodeValue)
      currentNode.leftNode = this.#removeTraverse(value, currentNode.leftNode);
    else {
      if (currentNode.leftNode === null) return currentNode.rightNode;
      else if (currentNode.rightNode === null) return currentNode.leftNode;
      else {
        const successor = this.#successor(currentNode.rightNode);
        currentNode.nodeValue = successor.nodeValue;
        currentNode.rightNode = this.#removeTraverse(
          currentNode.nodeValue,
          currentNode.rightNode
        );
      }
    }
    return currentNode;
  }

  //find the correct successfor for the node being deleted
  #successor(root) {
    while (root.leftNode !== null && root !== null) {
      root = root.leftNode;
    }
    return root;
  }
}
