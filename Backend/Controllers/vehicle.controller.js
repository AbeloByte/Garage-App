// import service
const { logger } = require("../libs/common");
const vehicleService = require("../services/vehicle.service");

//  a function to create  vehicle
async function createVehicle(req, res) {
  try {
    const { customerId, vehicleData } = req.body;
    logger.log("Line 9 in controller", customerId, vehicleData);

    const NewVehicle = await vehicleService.createVehicle({
      customerId,
      vehicleData,
    });

    logger.log("Line 17 in controller", NewVehicle);

    if (!NewVehicle) {
      return res
        .status(400)
        .json({ status: 400, message: "Vehicle not created" });
    } else {
      return res.status(201).json({
        status: 201,
        message: " Vehicle Information created successfully",
        data: NewVehicle,
      });
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
}

// function to get vehicle information
async function getVehicleInfo(req, res) {
  try {
    const customerId = req.params.customerId;
    const vehicle = await vehicleService.getVehicleInfo(customerId);
    logger.log("Line 31", vehicle);
    if (!vehicle) {
      return res
        .status(400)
        .json({ status: 400, message: "No Vehicle found " });
    } else {
      return res.status(200).json({
        status: 200,
        message: "Vehicle Information retrieved successfully",
        data: vehicle,
      });
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
}

// export the function
module.exports = { createVehicle, getVehicleInfo };
