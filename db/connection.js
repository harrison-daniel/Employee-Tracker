const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: 'AvJWLgj9prp62i3K6Wr4',
  database: 'employee_db'
});

module.exports = db;

