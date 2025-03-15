// import the database connection

const connection = require("../Config/dbconfig");

// create a function to create a vehicle

async function createVehicle(vehicle) {
  try {
    let customerId = vehicle.customer_id;

    // If customer_id is not provided, fetch it using email or phone
    if (!customerId) {
      const customerQuery = `
        SELECT customer_id FROM customer_identifier 
        WHERE customer_email = ? LIMIT 1`;
      const [customer] = await connection.query(customerQuery, [
        vehicle.customer_email,
      ]);

      if (!customer) {
        throw new Error("Customer not found");
      }

      customerId = customer.customer_id; // Assign the retrieved customer_id
    }
    const CarInformationQuery = `INSERT INTO customer_vehicle_info ( customer_id ,vehicle_year,vehicle_make,vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color) VALUES(?,?,?,?,?,?,?,?,?)`;

    const rows = await connection.query(CarInformationQuery, [
      vehicle.customer_id,
      vehicle.vehicle_year,
      vehicle.vehicle_make,
      vehicle.vehicle_model,
      vehicle.vehicle_type,
      vehicle.vehicle_mileage,
      vehicle.vehicle_tag,
      vehicle.vehicle_serial,
      vehicle.vehicle_color,
    ]);

    return rows;
  } catch (error) {
    return error;
  }
}

// function to fetch vehicle information for a customer
async function getVehicleInfo(customerId) {
  try {
    const vehicleQuery = `SELECT * FROM customer_vehicle_info WHERE customer_id = ?`;
    const [vehicle] = await connection.query(vehicleQuery, [customerId]);

    return vehicle;
  } catch (error) {
    return error;
  }
}
// export the function
module.exports = { createVehicle, getVehicleInfo };
