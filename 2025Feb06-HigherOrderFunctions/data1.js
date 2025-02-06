//Task: Data Transformation and Aggregation
//You have an array of objects representing employees, each with a name, salary, and department. Your task is to perform the following operations:
//
//Filter: Extract the employees who are in the "Engineering" department.
//Map: After filtering, create a new array with just the names and salaries of those employees.
//Reduce: Calculate the total salary of all employees in the "Engineering" department.
//Example Input:
//js
//Copy
//const employees = [
//  { name: "John", department: "Engineering", salary: 80000 },
//  { name: "Jane", department: "Marketing", salary: 65000 },
//  { name: "Mike", department: "Engineering", salary: 90000 },
//  { name: "Lucy", department: "Engineering", salary: 75000 },
//  { name: "Sarah", department: "HR", salary: 55000 }
//];


export const employeeData = [
  { name: "John", department: "Engineering", salary: 80000 },
  { name: "Jane", department: "Marketing", salary: 65000 },
  { name: "Mike", department: "Engineering", salary: 90000 },
  { name: "Lucy", department: "Engineering", salary: 75000 },
  { name: "Sarah", department: "HR", salary: 55000 },
  { name: "David", department: "Engineering", salary: 95000 },
  { name: "Emma", department: "Marketing", salary: 70000 },
  { name: "Lucas", department: "Sales", salary: 60000 },
  { name: "Nina", department: "Engineering", salary: 85000 },
  { name: "Sophia", department: "Marketing", salary: 72000 },
  { name: "James", department: "Sales", salary: 68000 },
  { name: "Megan", department: "HR", salary: 59000 },
  { name: "Liam", department: "Engineering", salary: 92000 },
  { name: "Olivia", department: "HR", salary: 62000 },
  { name: "Ethan", department: "Sales", salary: 73000 },
  { name: "Amelia", department: "Marketing", salary: 71000 },
  { name: "Benjamin", department: "Sales", salary: 77000 },
  { name: "Charlotte", department: "Engineering", salary: 88000 },
  { name: "Aiden", department: "Marketing", salary: 68000 },
  { name: "Ella", department: "HR", salary: 60000 }
];
