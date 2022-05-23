const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',

    user: 'root',

    password: 'AvJWLgj9prp62i3K6Wr4',
    database: 'tracker'
  },
  console.log('Connected to the tracker database.')
);

// start server after DB connection
db.connect(err => {
  if (err) throw err;
  // console.log('Database connected.');
  promptUser();
});

function promptUser() {
  
  console.log(`
  ================
  Employee Manager
  ================
  `);
  
  return inquirer
    .prompt({
      type: 'list',
      name: 'mainPrompt',
      message: 'What would you like to do? (Use arrow keys)',
      choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add Role', 'Add an Employee', 'Update Employee Role','Quit']
    })
    .then(answer => {
      switch (answer.mainPrompt) {
        case "View All Departments":
          viewAllDepartments();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add a Department":
          addADepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add an Employee":
          addAnEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Quit":
          quit();
          break;
        
      }
    })
};
