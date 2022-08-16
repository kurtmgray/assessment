Instructions:
Step 1: run `yarn`
Step 2: run `yarn start`

Logic/style decisions:
Recursive functions were a little easier to implement so I went that route.
Reuse of getBoss, with an added "noLog" boolean parameter to prevent unwanted logs when calling from another function.
When replacing one employee with another, I decided to swap names, rather than full nodes, since the pay, title, and dependants for a promotion or demotion would likely stay the same at a particular level.

If I had more time:
Implementing a test suite. I tried to handle as many edge cases as I could in reasonable time.

Time complexity:
All O(n) - no nested loops.

Two functions:
Promote and demote could be written as one function, "swapEmployees()", for example. Both functions deal with a specific pairing of two employees.
