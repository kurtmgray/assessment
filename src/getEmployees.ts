import { TreeNode } from "./Types";

/**
 * Given an employee, will find the node above (if any).
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */
export function getBoss(
  root: TreeNode,
  employeeName: string,
  noLog: boolean
): TreeNode {
  if (root.descendants.find((e) => e.value.name === employeeName)) {
    if (!noLog)
      console.log(`[getBoss]: ${employeeName}'s boss is ${root.value.name}`);
    return root;
  } else {
    let res = null;
    for (let i = 0; res === null && i < root.descendants.length; i++) {
      res = getBoss(root.descendants[i], employeeName, noLog);
    }
    return res;
  }
}

/**
 * Given an employee, will find the nodes directly below (if any).
 * Notice how it returns possibly several subordinates.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode[]}
 */
export function getSubordinates(
  tree: TreeNode,
  employeeName: string
): TreeNode[] {
  const getSubordRecursive = (node: TreeNode, name: string): TreeNode[] => {
    if (node.value.name === name) {
      return node.descendants;
    } else {
      let res = null;
      for (let i = 0; res === null && i < node.descendants.length; i++) {
        res = getSubordRecursive(node.descendants[i], name);
      }
      return res;
    }
  };

  let subordinates: TreeNode[] = getSubordRecursive(tree, employeeName);

  let subNames: string[] = [];
  subordinates.forEach((sub) => {
    subNames.push(sub.value.name);
  });
  console.log(
    subordinates.length > 1
      ? `[getSubordinate]: ${employeeName}'s subordinates are ${subNames.join(
          ", "
        )}`
      : `[getSubordinate]: ${employeeName}'s subordinate is ${subNames[0]}`
  );
  return subordinates;
}

/**
 * EXTRA CREDIT:
 * Finds and returns the lowest-ranking employee and the tree node's depth index.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */
function findLowestEmployee() {}
