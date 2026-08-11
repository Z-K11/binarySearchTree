import { binaryTree } from './tree.js';
const tree = new binaryTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
tree.prettyPrint();
console.log(tree.includes(10));
console.log(tree.includes(10));
console.log(tree.includes(13));
