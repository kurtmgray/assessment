import { Employee, TreeNode } from "./Types";
import { getBoss } from "./getEmployees";

/**
 * Normalizes the provided JSON file and generates a tree of employees.
 *
 * @param {Object[]} employees array of employees
 * @returns {TreeNode}
 */
export function generateCompanyStructure(employees: Employee[]): TreeNode {
  console.log("Normalizing JSON file...");
  employees.forEach((employee) => {
    const idx = employee.name.indexOf("@");
    if (idx > -1) {
      const normalizedName =
        employee.name[0].toUpperCase() + employee.name.substring(1, idx);
      employee.name = normalizedName;
    }
  });

  console.log("Generating employee tree...");
  let map: { [name: string]: TreeNode } = {};
  let node: TreeNode;
  let root: TreeNode;

  for (let i = 0; i < employees.length; i++) {
    map[employees[i].name] = new TreeNode(employees[i]);
    map[employees[i].name].descendants = [];
  }

  for (let i = 0; i < employees.length; i++) {
    node = map[employees[i].name];
    if (node.value.boss !== null) {
      map[node.value.boss].descendants.push(node);
    } else {
      root = node;
    }
  }
  return root;
}
/**
 * Adds a new employee to the team and places them under a specified boss.
 *
 * @param {TreeNode} tree
 * @param {Object} newEmployee
 * @param {string} bossName
 * @returns {void}
 */
export function hireEmployee(
  root: TreeNode,
  newEmployee: Employee,
  bossName: string
): void {
  const newHire = new TreeNode(newEmployee);
  const hireRecursive = (
    node: TreeNode,
    newHire: TreeNode,
    boss: string
  ): TreeNode[] => {
    if (node.value.name === boss) {
      newHire.value.boss = boss;
      node.descendants.push(newHire);
      console.log(
        `[hireEmployee]: Added new employee (${newHire.value.name}) with ${boss} as their boss`
      );
      return;
    } else {
      for (let i = 0; i < node.descendants.length; i++) {
        hireRecursive(node.descendants[i], newHire, boss);
      }
    }
  };
  hireRecursive(root, newHire, bossName);
}

/**
 * Removes an employee from the team by name.
 * If the employee has other employees below them, randomly selects one to take their place.
 *
 * @param {TreeNode} tree
 * @param {string} name employee's name
 * @returns {void}
 */
export function fireEmployee(root: TreeNode, employeeName: string): void {
  const boss = getBoss(root, employeeName, true);

  const fireRecursive = (node: TreeNode, name: string): void => {
    let randomReplacement: TreeNode;
    let curNode = node;
    if (curNode.value.name === name) {
      if (curNode.descendants.length) {
        let randomIdx = Math.floor(Math.random() * curNode.descendants.length);
        randomReplacement = curNode.descendants.splice(randomIdx, 1)[0];
        curNode.value.name = randomReplacement.value.name;
        curNode.descendants.forEach((emp) => {
          emp.value.boss = curNode.value.name;
        });
        if (!boss) {
          root = randomReplacement;
        }
        console.log(
          `[fireEmployee]: Fired ${name} and replaced with ${randomReplacement.value.name}`
        );
      } else {
        let firedIdx = boss.descendants.findIndex(
          (node) => node.value.name === name
        );
        boss.descendants.splice(firedIdx, 1);
        console.log(`[fireEmployee]: Fired ${name}`);
      }
    } else {
      let res = null;
      for (let i = 0; res === null && i < curNode.descendants.length; i++) {
        res = fireRecursive(curNode.descendants[i], name);
      }
      return res;
    }
  };
  fireRecursive(root, employeeName);
}
/**
 * Promotes an employee one level above their current ranking.
 * The promoted employee and their boss should swap places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {void}
 */
export function promoteEmployee(root: TreeNode, employeeName: string): void {
  let boss = getBoss(root, employeeName, true);
  let bossBoss = getBoss(root, boss.value.name, true);

  const promoteRecursive = (node: TreeNode, employee: string): void => {
    let curNode = node;
    if (curNode.value.name === employee) {
      let temp = boss.value.name;
      boss.value.name = employee;
      boss.value.boss = bossBoss ? bossBoss.value.name : null;
      curNode.value.name = temp;

      const idx = boss.descendants.findIndex(
        (emp) => emp.value.name === employee
      );
      boss.descendants.splice(idx, 0)[0];

      curNode.descendants.forEach((emp) => {
        emp.value.boss = curNode.value.name;
      });

      boss.descendants.forEach((emp) => {
        emp.value.boss = boss.value.name;
      });
      console.log(
        `[promoteEmployee]: Promoted ${employeeName} and made ${curNode.value.name} their subordinate`
      );
    } else {
      let res = null;
      for (let i = 0; res === null && i < curNode.descendants.length; i++) {
        res = promoteRecursive(curNode.descendants[i], employee);
      }
      return res;
    }
  };
  promoteRecursive(root, employeeName);
}

/**
 * Demotes an employee one level below their current ranking.
 * Picks a subordinat and swaps places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName the employee getting demoted
 * @param {string} subordinateName the new boss
 * @returns {void}
 */
export function demoteEmployee(
  root: TreeNode,
  employeeName: string,
  subordinateName: string
): void {
  let curNode = root;
  let sub: TreeNode;
  if (curNode.value.name === employeeName) {
    sub = curNode.descendants.find((emp) => emp.value.name === subordinateName);
    sub.value.name = employeeName;
    curNode.value.name = subordinateName;

    curNode.descendants.forEach((emp) => {
      emp.value.boss = curNode.value.name;
    });
  } else {
    let res = null;
    for (let i = 0; res === null && i < curNode.descendants.length; i++) {
      demoteEmployee(curNode.descendants[i], employeeName, subordinateName);
    }
    return res;
  }
  console.log(
    `[demoteEmployee]: Demoted employee (demoted ${sub.value.name} and replaced with ${curNode.value.name})`
  );
}
