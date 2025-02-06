import { employeeData } from "./data.js"; // importing employeeData from data.js

// Use of Higher order function
let employees = [...new Map(employeeData.map(emp => [emp.name, emp])).values()];


const employeesData = document.getElementById('employee-data');
const totalSalaryEl = document.getElementById('total-salary');
const employeeDetail = document.getElementById('employee-detail');
const departmentOptions = document.getElementById('select-department');

const departments = new Set(employees.map(emp => emp.department));
departments.forEach((department) => {
  let option = document.createElement('option');
  option.value = department;
  option.text = department;
  departmentOptions.add(option);
})

// Function to display employee details
function displayEmployeeDetail(){
  employees.forEach((employee) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.department}</td>
      <td>$${employee.salary}</td>
    `;
    employeesData.appendChild(row);
  })
}

// Function to calculate and display total salary
function getTotalSalary(employees) {
  // Use of higher order function: reduce to calculate total salary
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0)
  totalSalaryEl.textContent = `Total Salary of Engineering Employees: $${totalSalary}`;
}




// Function to go back to the employee list
function goBackToList() {
  employeesData.innerHTML = '';
  document.getElementById('total-salary').innerHTML = ''; 
  document.getElementById('go-back').innerHTML = ''; 
  totalSalaryEl.style.display = 'none';
  document.getElementById('select-department').value = 'All';

  displayEmployeeDetail();
}

// Calling functions
displayEmployeeDetail(); //display employee details
getTotalSalary(employees); //calculate and display total salary

// Event listener for department selection
const selectDepartment = document.getElementById('select-department');

// Event listener for department selection
selectDepartment.addEventListener('change', function () {
  const selectedDepartment = selectDepartment.value;

  document.getElementById('employee-detail').style.display = 'block';
  document.getElementById('total-salary').innerHTML = ''; 

  employeesData.innerHTML = '';

  // Filter employees based on selected department (Use of Higher order function: filter)
  const selectedEmployees = employees.filter(emp => emp.department === `${selectedDepartment}`);

  const employeeList = document.getElementById('employee-list');
  employeeList.innerHTML = '';

  selectedEmployees.forEach(emp => {
    employeesData.innerHTML += `<tr><td>${emp.name}</td><td>${emp.department}</td><td>$${emp.salary.toLocaleString()}</td></tr>`;
  });


  getTotalSalary(selectedEmployees); //calling function to calculate and display total salary

  const goBack = document.getElementById('go-back');
  goBack.innerHTML = '<button id="go-back-button">Go Back to List</button>';

  document.getElementById('go-back-button').addEventListener('click', goBackToList); // calling function to go back to the employee list


});


