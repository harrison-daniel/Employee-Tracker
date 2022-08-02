const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const db = require('./db/connection');

// // start server after DB connection
// db.connect(err => {
//   if (err) throw err;
//   // console.log('Database connected.');
//   promptUser();
// });

promptUser();

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
      choices: ['View All Departments','Add a Department', 'View All Roles', 'Add Role', 'View All Employees', 'Add an Employee', 'Update Employee Role','Quit']
    })
    .then(answer => {
      switch (answer.mainPrompt) {
        case "View All Departments":
          viewAllDepartments();
          break;
        case "Add a Department":
          addADepartment();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Employees":
          viewAllEmployees();
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


viewAllDepartments = () => {

  const sql = `SELECT department_is AS id, department.department_name AS department FROM department`;
};

// async function main() {
//   // get the client
//   const mysqlProm = require('mysql2/promise');
//   // create the connection
//   const connection = await mysqlProm.createConnection({host:'localhost', user: 'root', database: 'tracker'});
//   // query database
//   const [rows, fields] = await connection.execute('SELECT * FROM `departments` WHERE `name` = ? AND `age` > ?', ['Morty', 14]);
// }