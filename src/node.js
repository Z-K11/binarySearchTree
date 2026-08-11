export class node {
  #root;
  #left;
  #right;
  constructor(x) {
    this.#root = x;
    this.#left = null;
    this.#right = null;
  }
  get leftNode() {
    return this.#left;
  }
  get rightNode() {
    return this.#right;
  }
  get nodeValue() {
    return this.#root;
  }
  set leftNode(node) {
    this.#left = node;
  }
  set rightNode(node) {
    this.#right = node;
  }
}
