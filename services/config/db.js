const mysql = require('mysql2/promise');

const dbConfig = {
  host: '192.168.8.8',
  user: 'root',
  password: 'mysql',
  database: 'todolist2',
  port: 23306
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;