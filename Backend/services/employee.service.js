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

// -------------------Employee Service-------------------
// function to get all employee
async function getAllEmployees() {
  // query to get all the employees
  const query = `SELECT * FROM employee 
  INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id
  INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id
  INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id ORDER BY employee.employee_id DESC limit 10`;

  const rows = await connection.query(query);
  // export the functions

  return rows;
}

// -------------------Get Single EmployeeInfo - Employee Service-------------------
// function to get Single Employee
async function getSingleEmployee() {
  const query = `SELECT * FROM employee WHERE employee_id = ?`;
  const row = await connection.query(query, [id]);
  return row;
}

// -------------------Update - Employee Service-------------------
async function updateEmployee(employee_id, employee_Info) {
  try {
    console.log("employee_id", employee_id);
    console.log("employee_Info", employee_Info);
    // a query to update the employee
    const UpdateEmployeeInfo = `UPDATE employee_info SET employee_first_name = ?, employee_last_name = ?,  employee_phone = ?
      
    WHERE employee_id = ? `;

    const UpdaeEmployee_rows = await connection.query(UpdateEmployeeInfo, [
      employee_Info.employee_first_name,
      employee_Info.employee_last_name,
      employee_Info.employee_phone,

      employee_id,
    ]);

    // query to update the employee status
    const updateEmployeeQuery = `
      UPDATE employee
      SET active_employee = ?
      WHERE employee_id = ?`;

    const updateEmployee = await connection.query(updateEmployeeQuery, [
      employee_Info.active_employee,
      employee_id,
    ]);
    // query to update the employee role
    const UpdateEmployeeRole = `UPDATE employee_role SET company_role_id = ? WHERE employee_id = ?`;
    const UpdateEmployeeRole_rows = await connection.query(UpdateEmployeeRole, [
      employee_Info.company_role_id,
      employee_id,
    ]);

    // to check if updated
    if (
      UpdaeEmployee_rows.affectedRows === 1 &&
      UpdateEmployeeRole_rows.affectedRows === 1 &&
      updateEmployee.affectedRows === 1
    ) {
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
  // query to update the employee
}

// -------------------Delete Employee Information - Employee Service-------------------
async function deleteEmployee(employee_id) {
  try {
    // Delete from employee_info table
    const deleteEmployeeInfoQuery = `DELETE FROM employee_info WHERE employee_id = ?`;
    await connection.query(deleteEmployeeInfoQuery, [employee_id]);

    // Delete from employee_pass table
    const deleteEmployeePassQuery = `DELETE FROM employee_pass WHERE employee_id = ?`;
    await connection.query(deleteEmployeePassQuery, [employee_id]);

    // Delete from employee_role table
    const deleteEmployeeRoleQuery = `DELETE FROM employee_role WHERE employee_id = ?`;
    await connection.query(deleteEmployeeRoleQuery, [employee_id]);

    // Delete from employee table
    const deleteEmployeeQuery = `DELETE FROM employee WHERE employee_id = ?`;
    const deleteEmployee = await connection.query(deleteEmployeeQuery, [
      employee_id,
    ]);

    if (deleteEmployee.affectedRows === 1) {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

// export the functions
module.exports = {
  checkIfEmployeeExist,
  createNewEmployee,
  getEmployeeByEmail,
  getAllEmployees,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
};
