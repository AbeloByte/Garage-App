// import express module
const express = require("express");
//  call router method from express
const router = express.Router();

// ---------------------------------------------------------
// import the install route
const installRoute = require("./install.routes");
// use the install route
router.use(installRoute);

// ---------------------------------------------------------
// import the employee route
const employeeRoute = require("./employee.routes");
// use the employee route
router.use(employeeRoute);

// ---------------------------------------------------------
// import the login route
const loginRoute = require("./login.routes");
// use the login route
router.use(loginRoute);

// import the customer route
const customerRoute = require("./customer.routes");
// use the customer route
router.use(customerRoute);

// export the router
module.exports = router;
