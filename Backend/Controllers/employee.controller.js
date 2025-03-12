// import employee service
const { response } = require("express");
const employeeService = require("../services/employee.service");

// async function to controlle the add employee
async function createEmployee(req, res, next) {
  console.log(req.headers);
  // check if the employee is already exist
  const employeeExists = await employeeService.checkIfEmployeeExist(
    req.body.employee_email
  );
  // if employee Exists
  if (employeeExists) {
    res.status(400).json({
      message: "A user with this email already exists",
    });
  } else {
    try {
      const employeeinfo = req.body;

      // console.log("This is the Employee information - - - > ", employeeinfo);

      const employee = await employeeService.createNewEmployee(employeeinfo);
      if (!employee) {
        res.status(400).json({
          message: "Failed to add the employee",
        });
      } else {
        res.status(200).json({
          message: "true",
        });
      }
    } catch (error) {
      res.status(400).json({
        error: "Something went wrong",
      });
    }
  }
}

// export the function
module.exports = { createEmployee };
