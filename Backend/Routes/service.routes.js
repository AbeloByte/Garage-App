// import express
const express = require("express");

//  call the router method from the express
const router = express.Router();

// import the service controller
const serviceController = require("../Controllers/service.controller");

// create a route to add the service
router.post("/api/add-services", serviceController.addService);

// create a route to get all services
router.get("/api/services", serviceController.getAllServices);

// create a route to get a single service
router.get("/api/service/:id", serviceController.getSingleService);

// create a route to edit a service

router.put("/api/service/edit/:id", serviceController.UpdateService);

// create a route to update a service status
router.put("/api/service/status/:id", serviceController.UpdateServiceStatus);

// create a route to get a delete a service
router.delete("/api/service/delete/:id", serviceController.deleteService);

// export the router
module.exports = router;
