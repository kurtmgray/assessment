export class TreeNode {
  value: Employee | null;
  descendants: TreeNode[];
  constructor(value: Employee | null = null) {
    this.value = value;
    this.descendants = [];
  }
}

export interface Employee {
  name: string;
  jobTitle: string;
  boss: string | null;
  salary: string;
}
