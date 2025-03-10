// import express
const express = require("express");
//  call the router method from the express
const router = express.Router();

// import the login controller
const loginController = require("../Controllers/login.controller");

// create a route to handle the login req
router.post("/api/employee/login", loginController.logIn);

module.exports = router;
