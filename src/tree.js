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
  prettyPrint(node = this.#root, prefix = '', isLeft = true) {
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
  }

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

  // takes a callBack function as an arguement and traverses the tree in levelorder calling the function on each node
  forEach(func, root = this.#root) {
    if (root === null) return;
    const que = [this.#root];
    while (que.length > 0) {
      const currentNode = que.shift();
      currentNode.nodeValue = func(currentNode.nodeValue);
      if (currentNode.leftNode !== null) que.push(currentNode.leftNode);
      if (currentNode.rightNode !== null) que.push(currentNode.rightNode);
    }
  }

  // takes a callBack function as an arguement and traverses the tree in inOrderTraversal calling the function on each node
  inOrderForEach(func, currentNode = this.#root) {
    if (currentNode === null) return;
    this.inOrderForEach(func, currentNode.leftNode);
    currentNode.nodeValue = func(currentNode.nodeValue);
    this.inOrderForEach(func, currentNode.rightNode);
  }

  // takes a callBack function as an arguement and traverses the tree in postOrderTraversal calling the function on each node
  postOrderForEach(func, currentNode = this.#root) {
    if (currentNode === null) return;
    this.postOrderForEach(func, currentNode.leftNode);
    this.postOrderForEach(func, currentNode.rightNode);
    currentNode.nodeValue = func(currentNode.nodeValue);
  }

  // takes a callBack function as an arguement and traverses the tree in preOrderTraversal calling the function on each node
  preOrderforEach(func, currentNode = this.#root) {
    if (currentNode === null) return;
    currentNode.nodeValue = func(currentNode.nodeValue);
    this.preOrderforEach(func, currentNode.leftNode);
    this.preOrderforEach(func, currentNode.rightNode);
  }

  //function that calcultaes the depth of the node of the node containing the value
  depth(x, currentNode = this.#root, edges = 0) {
    if (currentNode === null) return undefined;
    if (currentNode.nodeValue === x) {
      return edges;
    }
    if (x > currentNode.nodeValue)
      return this.depth(x, currentNode.rightNode, edges + 1);
    if (x < currentNode.nodeValue)
      return this.depth(x, currentNode.leftNode, edges + 1);
  }

  // function that calculates the height of the node containing the value
  #heightOfTree(currentNode) {
    if (currentNode === null) return -1;
    const lheight = this.#heightOfTree(currentNode.leftNode);
    const rheight = this.#heightOfTree(currentNode.rightNode);
    return 1 + Math.max(lheight, rheight);
  }

  //calculates the heigh of the node with given value
  height(x, currentNode = this.#root) {
    if (currentNode === null) return -1;
    if (currentNode.nodeValue === x) return this.#heightOfTree(currentNode);

    if (x > currentNode.nodeValue) return this.height(x, currentNode.rightNode);
    if (x < currentNode.nodeValue) return this.height(x, currentNode.leftNode);
  }

  // checks if the tree is balanced
  isBalanced(currentNode = this.#root) {
    if (currentNode === null) return true;
    const lheigh = this.#heightOfTree(currentNode.leftNode);
    const rheigh = this.#heightOfTree(currentNode.rightNode);
    if (Math.abs(lheigh - rheigh) > 1) return false;
    return (
      this.isBalanced(currentNode.leftNode) &&
      this.isBalanced(currentNode.rightNode)
    );
  }

  // returns a sorted array of values from tree using inOrder Traversal;
  #arrayFromBinaryTree(currentNode = this.#root, arr = []) {
    if (currentNode === null) return;
    this.#arrayFromBinaryTree(currentNode.leftNode, arr);
    arr.push(currentNode.nodeValue);
    this.#arrayFromBinaryTree(currentNode.rightNode, arr);
    return arr;
  }

  // checks if the treee is unbalanced and creates a new tree from the nodes of the current tree and assign it to root
  rebalance() {
    if (this.isBalanced()) return false;
    else {
      const sortedArray = this.#arrayFromBinaryTree();
      this.#root = this.#buildTree(
        sortedArray,
        0,
        sortedArray.length - 1,
        this.#root
      );
      return true;
    }
  }
}
