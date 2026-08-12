export class node {
  // this is the root of the node
  #data;
  // left pointer points to the left subtree
  #left;
  // right pointer points to the right subtree
  #right;
  constructor(x) {
    // initializing the tree
    this.#data = x;
    this.#left = null;
    this.#right = null;
  }

  // return left subtree pointer
  get leftNode() {
    return this.#left;
  }

  // return right subtree pointer
  get rightNode() {
    return this.#right;
  }

  // return value stored in root
  get nodeValue() {
    return this.#data;
  }

  // assign subtree to left subtree pointer
  set leftNode(node) {
    this.#left = node;
  }

  // assign subtree to right subtree pointer
  set rightNode(node) {
    this.#right = node;
  }
  set nodeValue(x) {
    this.#data = x;
  }
}
