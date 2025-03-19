// import the database connection

const connection = require("../Config/dbconfig");

// create a function to create a vehicle

async function createVehicle({ customerId, vehicleData }) {
  try {
    const CarInformationQuery = `INSERT INTO customer_vehicle_info ( customer_id ,vehicle_year,vehicle_make,vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color) VALUES(?,?,?,?,?,?,?,?,?)`;

    const rows = await connection.query(CarInformationQuery, [
      customerId,
      vehicleData.vehicle_year,
      vehicleData.vehicle_make,
      vehicleData.vehicle_model,
      vehicleData.vehicle_type,
      vehicleData.vehicle_mileage,
      vehicleData.vehicle_tag,
      vehicleData.vehicle_serial,
      vehicleData.vehicle_color,
    ]);

    console.log("rows information", rows);
    if (rows.affectedRows === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
}

// function to fetch vehicle information for a customer
async function getVehicleInfo(customerId) {
  try {
    const vehicleQuery = `SELECT * FROM customer_vehicle_info WHERE customer_id = ?`;
    const vehicle = await connection.query(vehicleQuery, [customerId]);

    return vehicle;
  } catch (error) {
    return error;
  }
}
// export the function
module.exports = { createVehicle, getVehicleInfo };
