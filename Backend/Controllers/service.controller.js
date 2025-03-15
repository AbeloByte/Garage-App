// import a service.service
const serviceService = require("../services/service.service");

// function to add a new service to the database
async function addService(req, res, next) {
  try {
    const ServiceInformation = req.body;
    // call the addService function from the serviceService
    const service = await serviceService.addNewService(ServiceInformation);

    // check if the service is added successfully
    if (service) {
      res.status(200).json({
        message: "Service added successfully",
        data: service,
      });
    } else {
      res.status(400).json({
        message: "Failed to add service",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while adding service",
    });
  }
}

// function to get all services
async function getAllServices(req, res, next) {
  try {
    // call the getAllServices function from the serviceService
    const services = await serviceService.getAllServices();

    // check if the services are fetched successfully
    if (services) {
      res.status(200).json({
        message: "Services fetched successfully",
        data: services,
      });
    } else {
      res.status(400).json({
        message: "Failed to fetch services",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while fetching services",
    });
  }
}
// export the functions
module.exports = {
  addService,
  getAllServices,
};
