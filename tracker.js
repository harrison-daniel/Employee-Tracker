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


var promptUser = ()=> {
  
  // console.log(`
  // ================
  // Employee Manager
  // ================
  // `);
  
  inquirer.prompt([
    {
      type: 'list',
      name: 'mainPrompt',
      message: 'What would you like to do? (Use arrow keys)',
      choices: ['View All Departments','Add a Department', 'View All Roles', 'Add Role', 'View All Employees', 'Add an Employee', 'Update Employee Role','Quit']
    },
  ])
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

var departmentList = [];
var managerList = [];
var roleList = [];
var updateRoleList = [];
var employeeList = [];

const viewAllDepartments = ()=> {
  const sql = `SELECT DISTINCT department.id, department.name AS Department FROM department`;

  db.query(sql, (err, res) => {
    if (err) {console.log(err);}
      console.table(res);
      promptUser();
    })

};


addADepartment = () => {

  inquirer.prompt([
    {
      type: 'input',
      name: 'add_department',
      message: 'What is the Department Name?'
  },
  ])
          .then((answers) =>{
        
            const addDepSql = `INSERT INTO department(name)
                        VALUES ("${answers.add_department}");`;
            db.query(addDepSql, (err, res) => {
            if (err) {console.log(err);}
                
                promptUser(); 
                console.log("Department Added")
                })

          })

       
};


viewAllRoles = () => {

  const sql = `SELECT DISTINCT role.title AS Role FROM Role`;
    db.query(sql, (err, res) => {
         if (err) {console.log(err);}
          console.table(res);
          promptUser(); 
        })
};



AddRole = () => {

  var pullDepartmentSQL = `SELECT name FROM department;`;
    
    db.query(pullDepartmentSQL, (err, res) => {
        if (err) {console.log(err);}
        for(var i = 0; i <res.length; i++){
            departmentList.push({name:res[i].name, value:i+1}) 
           
        }
        })
       
    inquirer.prompt([
        {
        type: 'input',
        name: 'add_role_title',
        message: 'What is the title for the Role?'
      },
        {
        type: 'input',
        name: 'add_role_salary',
        message: 'What is the salary?'
        },
        {
        type: 'list',
        name: 'add_role_department',
        message: 'What is the name of the Department for this Role?',
        choices: departmentList
    },
      ])
              .then((answers) =>{
            
                const addRoleSql = `INSERT INTO role(title,salary,department_ID)
                VALUES ("${answers.add_role_title}","${answers.add_role_salary}", "${answers.add_role_department}");`;

                    db.query(addRoleSql, (err, res) => {
                    if (err) {console.log(err);}
                        
                        })
                        PromptUser();
                        console.log("Employee Role has been Added")
                })
};



viewAllEmployees = () => {

  //Join role, employee, department, import manager as name not id
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
  FROM employee 
  LEFT JOIN role on employee.role_id = role.id 
  LEFT JOIN department on role.department_id = department.id 
  LEFT JOIN employee manager on manager.id = employee.manager_id;`

  db.query(sql, (err, res) => {
      if (err) {
          console.log(err);
      } 
      console.table(res);
        promptUser(); 
      })
};


addAnEmployee = () => {

  const sql = `SELECT department_id, department_name AS department FROM department`;

  db.query(sql, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res);
  })
  promptUser();
};


updateEmployeeRole = () => {

  const sql = `SELECT department_id, department_name AS department FROM department`;

  db.query(sql, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res);
  })
  promptUser();
};

quit = () => {
  db.end();
};


promptUser();
