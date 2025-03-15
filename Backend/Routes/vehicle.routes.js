// import express
const express = require("express");
//  call the router method from the express
const router = express.Router();

// import the vehicle  controller
const vehicleController = require("../Controllers/vehicle.controller");

// create a route to handle the vehicle
router.post("/api/vehicle", vehicleController.createVehicle);

// export the router
module.exports = router;
