// import express
const express = require("express");

//  call the router method from the express
const router = express.Router();

// import the service controller
const serviceController = require("../Controllers/service.controller");

// create a route to add the service
router.post("/api/add-service", serviceController.addService);

// create a route to get all services
router.get("/api/services", serviceController.getAllServices);

// export the router
module.exports = router;
