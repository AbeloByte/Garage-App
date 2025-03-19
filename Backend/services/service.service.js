// import the database connection
const connection = require("../Config/dbconfig");

// function to add a new service to the database

async function addNewService(ServiceInformation) {
  try {
    // query to insert a new service to the database
    const [service] = await connection.query(
      `INSERT INTO common_services (service_name, service_description) VALUES (?, ?)`,
      [ServiceInformation.service_name, ServiceInformation.service_description]
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

// export

module.exports = {
  addNewService,
  getAllServices,
  deleteService,
};
