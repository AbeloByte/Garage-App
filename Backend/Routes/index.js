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

// import the vehicle route
const vehicleRoute = require("./vehicle.routes");
// use the vehicle route
router.use(vehicleRoute);

// import the service route
const serviceRoute = require("./service.routes");
// use the service route
router.use(serviceRoute);

// import order service
const orderRoute = require("./order.routes");
// use the order route
router.use(orderRoute);

// export the router
module.exports = router;
