// Importing mysql2 module to connect to the database promise based
const { createPool } = require("mysql2");
const mysql = require("mysql2/promise");

// prepare the connection parameters to the database from env variables
const dbConfig = {
  host: process.env.DB_HOST, // database host
  user: process.env.DB_USER, // database user
  password: process.env.DB_PASS, // database password
  database: process.env.DB_NAME, // database name
  connectionLimit: 5, // connection limit
};

// create a database connection pool
const pool = mysql.createPool(dbConfig)

// funciton to execute sql queries async
async function query(sql,parameters){
    const [rows,fields] = await pool.execute(sql,parameters)
    return rows; 

}  

module.exports = {query}

