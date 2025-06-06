// import express
const express = require("express");
// call the router method from express
const router = express.Router();

// import the customer controller
const customerController = require("../Controllers/customer.controller");

// import middleware
// const authmiddleware = require("../MiddleWare/auth.middleware");

// create a route to handle the get all customers req
router.post("/api/customer", customerController.addCustomer);

router.get("/api/all-customers", customerController.getAllCustomers);

// // get single customer information
router.get("/api/customer/:id", customerController.getCustomerbyId);

// // route to edit the customer
router.put("/api/customer/edit/:id", customerController.editCustomer);

// route to search a customer
router.get("/api/customer/search/:name", customerController.searchCustomer);

// // route to delete the customer
// router.delete("/api/customers/:id", customerController.deleteCustomer);

module.exports = router;
