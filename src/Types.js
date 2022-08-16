"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeNode = void 0;
class TreeNode {
  constructor(value = null) {
    this.value = value;
    this.descendants = [];
  }
}
exports.TreeNode = TreeNode;
