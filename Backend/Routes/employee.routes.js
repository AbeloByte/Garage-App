// import express module
const express = require("express");
// call the router method from the express
const router = express.Router();
// import the employee controller
const employeeController = require("../Controllers/employee.controller");

// create a route to handle the get all employees req
router.post("/api/employee", employeeController.createEmployee);

// export the router
module.exports = router;
