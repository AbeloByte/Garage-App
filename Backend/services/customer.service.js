// import the db connection

const connection = require("../Config/dbconfig");

// import crypto
const crypto = require("crypto");
// function to create a customer

// --------- Customer Service ---------

// funtion to check if a customer exists
async function checkIfCustomerExist(email) {
  // query to check if the customer exists
  const query = `SELECT * FROM customer_identifier WHERE customer_email = ?`;

  const row = await connection.query(query, [email]);
  // if the row is empty return false
  if (row.length === 0) {
    return false;
  }
  // if the row is not empty return true
  return true;
}

// --------- Customer Service ---------
async function createNewCustomer(customer) {
  let createdCustomer = {};
  try {
    // a random hash
    console.log(
      " Service Line 31 : Customer Information that i get from the client side in the service",
      customer
    );
    const customer_hash = crypto
      .createHash("sha256")
      .update(customer.customer_email)
      .digest("hex");

    // insert data in to the customerIdentifier
    const insertCustomerIdentifierQuery = `INSERT INTO customer_identifier (customer_email,customer_phone_number,customer_hash) VALUES (?, ?, ?)`;

    const rows = await connection.query(insertCustomerIdentifierQuery, [
      customer.customer_email,
      customer.customer_phone_number,
      customer_hash,
    ]);

    // console.log("The row information :::", rows);

    if (rows.affectedRows !== 1) {
      return false;
    }
    // Get the generated customer_id
    const customer_id = rows.insertId;

    // insert the remaining data to the customer_info table
    const insertCustomerInfoQuery = `INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name,active_customer_status) VALUES (?, ?, ?, ?)`;
    // execute the query
    const rows2 = await connection.query(insertCustomerInfoQuery, [
      customer_id,
      customer.customer_first_name,
      customer.customer_last_name,
      customer.active_customer_status,
    ]);

    createdCustomer = {
      customer_id: customer_id,
      customer_hash: customer_hash,
    };

    console.log("The row information2222 :::", createdCustomer);
  } catch (error) {
    return false;
  }

  return createdCustomer;
}

module.exports = {
  checkIfCustomerExist,
  createNewCustomer,
};
