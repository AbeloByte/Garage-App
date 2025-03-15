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
    const [services] = await connection.query(`SELECT * FROM common_services`);
    return services;
  } catch (error) {
    // return an error if the query is not executed successfully
    return error;
  }
}
// export

module.exports = {
  addNewService,
  getAllServices,
};
