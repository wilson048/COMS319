// Author: Wilson Chu
// ISU Netid : wvchu@iastate.edu
// Date :  April 27, 2024

const mysql = require("mysql2/promise");
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "Hiroshima9!",
  database: "secoms319",
});
module.exports = db;
