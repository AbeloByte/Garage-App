// import express module
const express = require("express");
// call the router method from the express
const router = express.Router();
// import the employee controller
const employeeController = require("../Controllers/employee.controller");

// import middleware
const authmiddleware = require("../MiddleWare/auth.middleware");
// create a route to handle the get all employees req
router.post(
  "/api/employee",
  [authmiddleware.verifyToken, authmiddleware.isAdmin],
  employeeController.createEmployee
);

router.get(
  "/api/employees",
  [authmiddleware.verifyToken, authmiddleware.isAdmin],
  employeeController.getAllEmployees
);

// export the router
module.exports = router;
