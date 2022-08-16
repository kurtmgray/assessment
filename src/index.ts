// Main code goes here
import * as employees from "./employees.json";
import * as manageEmployees from "./manageEmployees";
import * as getEmployees from "./getEmployees";

function main() {
  let companyTree = manageEmployees.generateCompanyStructure(
    employees.employees
  );

  manageEmployees.hireEmployee(
    companyTree,
    { name: "Jeb", jobTitle: "Mascot", boss: null, salary: "2" },
    "Sarah"
  );

  manageEmployees.fireEmployee(companyTree, "Alicia");

  manageEmployees.promoteEmployee(companyTree, "Jared");

  manageEmployees.demoteEmployee(companyTree, "Xavier", "Maria");

  getEmployees.getBoss(companyTree, "Bill", false);

  getEmployees.getSubordinates(companyTree, "Maria");

  console.log("main");
}

main();
