class Node {
    constructor(val, left = null, right = null) {
      this.val = val;
      this.left = left;
      this.right = right;
    }
  }
  
  class BinarySearchTree {
    constructor(root = null) {
      this.root = root;
    }
  
    // Insert a new node into the BST with value val using iteration.
    insert(val) {
      let newNode = new Node(val);
  
      if (!this.root) {
        this.root = newNode;
        return this;
      }
  
      let current = this.root;
      while (true) {
        if (val < current.val) {
          if (!current.left) {
            current.left = newNode;
            return this;
          }
          current = current.left;
        } else {
          if (!current.right) {
            current.right = newNode;
            return this;
          }
          current = current.right;
        }
      }
    }
  
    // Insert a new node into the BST with value val using recursion.
    insertRecursively(val, node = this.root) {
      if (!node) {
        return new Node(val);
      }
  
      if (val < node.val) {
        node.left = this.insertRecursively(val, node.left);
      } else {
        node.right = this.insertRecursively(val, node.right);
      }
  
      return node;
    }
  
    // Find a node with value val using iteration.
    find(val) {
      let current = this.root;
  
      while (current) {
        if (val === current.val) {
          return current;
        } else if (val < current.val) {
          current = current.left;
        } else {
          current = current.right;
        }
      }
  
      return undefined;
    }
  
    // Find a node with value val using recursion.
    findRecursively(val, node = this.root) {
      if (!node) return undefined;
  
      if (val === node.val) return node;
      if (val < node.val) return this.findRecursively(val, node.left);
      return this.findRecursively(val, node.right);
    }
  
    // Traverse the tree using pre-order DFS.
    dfsPreOrder(node = this.root, result = []) {
      if (node) {
        result.push(node.val);
        this.dfsPreOrder(node.left, result);
        this.dfsPreOrder(node.right, result);
      }
      return result;
    }
  
    // Traverse the tree using in-order DFS.
    dfsInOrder(node = this.root, result = []) {
      if (node) {
        this.dfsInOrder(node.left, result);
        result.push(node.val);
        this.dfsInOrder(node.right, result);
      }
      return result;
    }
  
    // Traverse the tree using post-order DFS.
    dfsPostOrder(node = this.root, result = []) {
      if (node) {
        this.dfsPostOrder(node.left, result);
        this.dfsPostOrder(node.right, result);
        result.push(node.val);
      }
      return result;
    }
  
    // Traverse the tree using BFS.
    bfs() {
      if (!this.root) return [];
  
      let result = [];
      let queue = [this.root];
  
      while (queue.length > 0) {
        let current = queue.shift();
        result.push(current.val);
  
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
      }
  
      return result;
    }
  
    // Remove a node with value val from the BST.
    remove(val, node = this.root) {
      if (!node) return null;
  
      if (val < node.val) {
        node.left = this.remove(val, node.left);
      } else if (val > node.val) {
        node.right = this.remove(val, node.right);
      } else {
        if (!node.left && !node.right) return null; // Leaf node
        if (!node.left) return node.right; // Node with one child
        if (!node.right) return node.left; // Node with one child
  
        let minRight = this.findMin(node.right);
        node.val = minRight.val;
        node.right = this.remove(minRight.val, node.right);
      }
  
      return node;
    }
  
    // Helper function to find the minimum value node.
    findMin(node) {
      while (node.left) node = node.left;
      return node;
    }
  
    // Check if the BST is balanced.
    isBalanced() {
      function height(node) {
        if (!node) return 0;
        return 1 + Math.max(height(node.left), height(node.right));
      }
  
      function checkBalance(node) {
        if (!node) return true;
  
        let leftHeight = height(node.left);
        let rightHeight = height(node.right);
  
        return Math.abs(leftHeight - rightHeight) <= 1 &&
               checkBalance(node.left) &&
               checkBalance(node.right);
      }
  
      return checkBalance(this.root);
    }
  
    // Find the second highest value in the BST.
    findSecondHighest() {
      function findMax(node) {
        while (node.right) node = node.right;
        return node;
      }
  
      function findSecondHighest(node) {
        if (!node || (!node.left && !node.right)) return undefined;
  
        if (node.right && !node.right.left && !node.right.right) {
          return node.val;
        }
  
        if (node.right) {
          return findSecondHighest(node.right);
        } else {
          return findMax(node.left).val;
        }
      }
  
      return findSecondHighest(this.root);
    }
  
    // Iterative in-order DFS.
    dfsInOrderIteratively() {
      let result = [];
      let stack = [];
      let current = this.root;
  
      while (stack.length > 0 || current) {
        while (current) {
          stack.push(current);
          current = current.left;
        }
  
        current = stack.pop();
        result.push(current.val);
        current = current.right;
      }
  
      return result;
    }
  }
  
  module.exports = BinarySearchTree;