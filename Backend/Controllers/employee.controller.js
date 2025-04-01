const { logger } = require("../libs/common");
// import employee service
const { response } = require("express");
const employeeService = require("../services/employee.service");

// async function to controlle the add employee
async function createEmployee(req, res, next) {
  // logger.log(req.headers);
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

// a function to getAllEmployees
async function getAllEmployees(req, res, next) {
  try {
    const getAllEmployees = await employeeService.getAllEmployees();

    if (!getAllEmployees) {
      res.status(400).json({
        message: "Failed to get all employees",
      });
    } else {
      res.status(200).json({
        status: "true",
        data: getAllEmployees,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "Something went wrong while getting all employees",
    });
  }
}

// a function to get Single Employee
async function getSingleEmployee(req, res, next) {
  try {
    const employee_id = req.params.id;
    logger.log("getSingleEmployee Controller line 64", employee_id);
    const getSingleEmployee = await employeeService.getSingleEmployee(
      employee_id
    );

    if (!getSingleEmployee) {
      res.status(400).json({
        message: "Failed to get the Single employee",
      });
    } else {
      res.status(200).json({
        status: "true",
        data: getSingleEmployee,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "Something went wrong while getting the employee",
    });
  }
}

// a function to update Employee
async function updateEmployee(req, res, next) {
  try {
    const employee_id = req.params.id;
    const employee_Info = req.body;

    logger.log("updateEmployee Controller line 91", employee_Info);
    const updateEmployee = await employeeService.updateEmployee(
      employee_id,
      employee_Info
    );

    logger.log("updateEmployee Controller line 95", updateEmployee);
    if (!updateEmployee) {
      res.status(400).json({
        message: "Failed to update the employee",
      });
    } else {
      res.status(200).json({
        status: "true",
        message: "Employee updated successfully",
        data: updateEmployee,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "Something went wrong while updating the employee",
    });
  }
}

// function to delete employee

async function deleteEmployee(req, res, next) {
  try {
    const employee_id = req.params.id;
    const deleteEmployee = await employeeService.deleteEmployee(employee_id);

    if (!deleteEmployee) {
      res.status(400).json({
        message: "Failed to delete the employee",
      });
    } else {
      res.status(200).json({
        status: "true",
        message: "Employee Information deleted successfully",
        data: deleteEmployee,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "Something went wrong while deleting the employee",
    });
  }
}

// export the function
module.exports = {
  createEmployee,
  getAllEmployees,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
};
