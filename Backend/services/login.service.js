// import bcrypt
const bcrypt = require("bcrypt");

//import employee service to get the employee email information
const employeeService = require("../services/employee.service");
// function to Login
async function login(employeeData) {
  try {
    // empty object to store the employee data
    let returned_employeeInformation = {};
    // get the email from employee service

    const employee = await employeeService.getEmployeeByEmail(
      employeeData.employee_email
    );
    // if the employee is not found return error
    if (employee.length === 0) {
      returned_employeeInformation = {
        status: "failed ",
        message: "Employee does not Exist",
      };
      return returned_employeeInformation;
    }

    // get the employee password
    const employeePassword = employee.employee_password_hashed;
    // compare the password
    const isPasswordMatch = await bcrypt.compare(
      employeeData.employee_password,
      employeePassword
    );

    // if the password is not correct return error
    if (!isPasswordMatch) {
      returned_employeeInformation = {
        status: "failed what",
        message: "Incorrect Password",
      };
      return returned_employeeInformation;
    }
    // store the employee information in the object
    returned_employeeInformation = {
      status: "success",
      data: employee,
    };

    // return the employee information

    return returned_employeeInformation;
  } catch (error) {
    logger.log(error);
    return {
      status: "failed",
      message: "Internal Server Error Occured",
    };
  }
}

// export the login service
module.exports = {
  login,
};
