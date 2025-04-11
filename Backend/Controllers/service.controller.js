const { logger } = require("../libs/common");
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

    // logger.log("Services Are Comming From :", services);
    // check if the services are fetched successfully
    console.log("Garage Services are ::: ", services);
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

// function to get a single service
async function getSingleService(req, res, next) {
  try {
    const id = req.params.id;

    console.log("The id is ::: ", id);
    // call the getSingleService function from the serviceService
    const service = await serviceService.getSingleService(id);

    // check if the service is fetched successfully
    if (service) {
      res.status(200).json({
        message: "Service fetched successfully",
        data: service,
      });
    } else {
      res.status(400).json({
        message: "Failed to fetch service",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while fetching service",
    });
  }
}

// function to delete a service
async function deleteService(req, res, next) {
  try {
    const id = req.params.id;
    // call the deleteService function from the serviceService
    const service = await serviceService.deleteService(id);

    // check if the service is deleted successfully
    if (service) {
      res.status(200).json({
        message: "Service deleted successfully ",
        data: service,
      });
    } else {
      res.status(400).json({
        message: "Failed to delete service",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while deleting service",
    });
  }
}

// function to update a service
async function UpdateService(req, res, next) {
  try {
    const id = req.params.id;
    const ServiceInformation = req.body;

    // call the addService function from the serviceService
    const service = await serviceService.updateService(id, ServiceInformation);
    // check if the service is updated successfully
    if (service) {
      res.status(200).json({
        message: "Service updated successfully",
        data: service,
      });
    } else {
      res.status(400).json({
        message: "Failed to update service in the Backend",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while updating service",
    });
    q;
  }
}

// function to update a service status
async function UpdateServiceStatus(req, res, next) {
  try {
    const id = req.params.id;
    const ServiceInformation = req.body;
    console.log(
      "This a service information from the updt service status controller",
      ServiceInformation
    );

    // call the addService function from the serviceService
    const service = await serviceService.updateServiceStatus(
      id,
      ServiceInformation
    );

    // check if the service is updated successfully
    if (service) {
      res.status(200).json({
        message: "Service status updated successfully",
      });
    } else {
      res.status(400).json({
        message: "Failed to update service status",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while updating service status",
    });
    // logger.log("Error while updating service status", error);
    logger.error("Error while updating service status", error);
  }
}

// export the functions
module.exports = {
  addService,
  getAllServices,
  deleteService,
  UpdateService,
  getSingleService,
  UpdateServiceStatus,
};
