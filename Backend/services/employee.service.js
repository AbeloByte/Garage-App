// import db function
const connection = require("../Config/dbconfig");

// import bycrpt
const bcrypt = require("bcrypt");

// -------------------Employee Service-------------------
// function to checkIfEmployeeExist
async function checkIfEmployeeExist(email) {
  // query to check if the employee exists
  const query = `SELECT * FROM employee WHERE employee_email = ?`;

  const row = await connection.query(query, [email]);
  // if the row is empty return false
  console.log(row);
  if (row.length === 0) {
    return false;
  }
  // if the row is not empty return true
  return true;
}

// -------------------Employee Service-------------------
// function to create the employee
async function createNewEmployee(employee) {
  let createdEmployee = {};
  try {
    //    encrypt the password
    const salt = bcrypt.genSaltSync(10);
    // hash the password
    const hashedPassword = await bcrypt.hash(employee.employee_password, salt);

    // insert Email in to the employee table
    const query = `INSERT INTO employee (employee_email,active_employee) VALUES (?,?)`;
    const rows = await connection.query(query, [
      employee.employee_email,
      employee.active_employee,
    ]);

    if (rows.affectedRows !== 1) {
      return false;
    }

    // insert the other informations to the table depending on the employee_id
    const employee_id = rows.insertId;

    //  inser the remaining data to the employee_info table,employee_id ,employee_pass ,employee_role

    const query2 = `INSERT INTO employee_info (employee_id,employee_first_name,employee_last_name,employee_phone) VALUES (?,?,?,?)`;
    // execute the query2
    const rows2 = await connection.query(query2, [
      employee_id,
      employee.employee_first_name,
      employee.employee_last_name,
      employee.employee_phone,
    ]);

    const query3 = `INSERT INTO employee_pass (employee_id,employee_password_hashed) VALUES (?,?)`;
    // execute the query3
    const rows3 = await connection.query(query3, [employee_id, hashedPassword]);
    // query4
    const query4 = `INSERT INTO employee_role (employee_id,company_role_id) VALUES (?,?)`;
    // execute the query4
    const rows4 = await connection.query(query4, [
      employee_id,
      employee.company_role_id,
    ]);

    // obj for the created employee
    createdEmployee = {
      employee_id: employee_id,
    };
  } catch (error) {
    console.log(error);
  }
  console.log("---------->   ", createdEmployee);
  return createdEmployee;
}

// -------------------Employee Service-------------------
// function to get employee by email by connecting information from the employee_info , employee_pass and employee_rolle table
async function getEmployeeByEmail(email) {
  // query to combine the employee_info and employee_pass and employee_role table
  const query = `SELECT * FROM employee
  INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id  
  INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id
  INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id
  WHERE employee_email = ?`;
  const row = await connection.query(query, [email]);

  return row[0];
}

// export the functions
module.exports = {
  checkIfEmployeeExist,
  createNewEmployee,
  getEmployeeByEmail,
};
