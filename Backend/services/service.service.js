// import the database connection
const connection = require("../Config/dbconfig");
const { logger } = require("../libs/common");

// function to add a new service to the database
async function addNewService(ServiceInformation) {
  try {
    // query to insert a new service to the database
    const [service] = await connection.query(
      `INSERT INTO common_services (service_name, service_description, service_price) VALUES (?, ?, ?)`,
      [
        ServiceInformation.service_name,
        ServiceInformation.service_description,
        ServiceInformation.service_price,
      ]
    );
    return service;
  } catch (error) {
    // return an error if the query is not executed successfully
    return error;
  }
}

// function to get all services
async function getAllServices() {
  try {
    // query to get all services from the database
    const services = await connection.query(`SELECT * FROM common_services`);
    return services;
  } catch (error) {
    // return an error if the query is not executed successfully
    return error;
  }
}

// function to get a single service
async function getSingleService(id) {
  try {
    console.log("Service ID is : ", id);
    const rows = await connection.query(
      `SELECT * FROM common_services WHERE service_id = ?`,
      [id]
    );

    console.log("Service Information is : ", rows);
    // check if the service exists
    if (rows.length === 0) {
      return false; // service not found
    }
    // return the service information
    return rows[0];
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
}

// function to delete a service
async function deleteService(id) {
  try {
    // query to delete a service from the database
    const service = await connection.query(
      `DELETE FROM common_services WHERE service_id = ?`,
      [id]
    );
    if (service[0].affectedRows === 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    // return an error if the query is not executed successfully
    return error;
  }
}

// function to update a service
async function updateService(id, ServiceInformation) {
  try {
    logger.log("Service Information is in Service.js: ", ServiceInformation);
    // query to update a service in the database
    const service = await connection.query(
      `UPDATE common_services SET service_name = ?, service_description = ?, service_price = ?, active_status = ? WHERE service_id = ?`,
      [
        ServiceInformation.service_name,
        ServiceInformation.service_description,
        ServiceInformation.service_price,
        ServiceInformation.active_status,
        id,
      ]
    );

    console.log("database Execution of the Service is : ", service);
    if (service.affectedRows !== 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // return an error if the query is not executed successfully
    return error;
  }
}

// function to update a service status
async function updateServiceStatus(id, status) {
  try {
    const new_status = status.active_status;
    console.log("Service status is : ", new_status);
    // query to update a service status in the database
    const service = await connection.query(
      `UPDATE common_services SET active_status = ? WHERE service_id = ?`,
      [new_status, id]
    );

    if (service.affectedRows !== 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // return an error if the query is not executed successfully
    return error;
  }
}

// export

module.exports = {
  addNewService,
  getAllServices,
  deleteService,
  updateService,
  getSingleService,
  updateServiceStatus,
};
