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

    // console.log("The row information2222 :::", createdCustomer);
  } catch (error) {
    return false;
  }

  return createdCustomer;
}

// --------- Customer Service ---------

async function getSingleCustomer(customer_id) {
  try {
    const getCustomerQuery = `SELECT ci.customer_first_name, ci.customer_last_name, ci.active_customer_status, 
             c.customer_email, c.customer_phone_number, c.customer_hash 
      FROM customer_identifier c
      JOIN customer_info ci ON c.customer_id = ci.customer_id
      WHERE c.customer_id = ?;
    `;

    const customer_rows = await connection.query(getCustomerQuery, [
      customer_id,
    ]);

    if (customer_rows.length === 0) {
      throw new Error("Customer not found");
    }

    return customer_rows;
  } catch (error) {
    // console.log("Error retrieving customer", error);
    throw error;
  }
}

// --------- Customer Service ---------
// function to get all customers
async function getAllCustomers() {
  // query to get all customers from different tables
  const getAllCustomersQuery = `SELECT * FROM customer_identifier 
  INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id 
ORDER BY customer_identifier.customer_id DESC 
LIMIT 10;
`;

  // execute the query
  const rows = await connection.query(getAllCustomersQuery);
  // if the rows is empty return false
  if (rows.length === 0) {
    return false;
  }
  // if the rows is not empty return the rows
  return rows;
}

// --------- Customer Service ---------
// funtion to edit customer information in the database
async function editCustomer(customer_id, customerInfo) {
  try {
    const customer = {
      customer_id: customer_id,
      customer_first_name: customerInfo.customer_first_name,
      customer_last_name: customerInfo.customer_last_name,
      customer_phone_number: customerInfo.customer_phone_number,
      active_customer_status: customerInfo.active_customer_status,
    };

    const updateCustomerQuery = `UPDATE customer_info
JOIN customer_identifier ON customer_info.customer_id = customer_identifier.customer_id
SET 
    customer_identifier.customer_phone_number = ?,
    customer_info.customer_first_name =?,
    customer_info.customer_last_name = ?,
    customer_info.active_customer_status = ?
WHERE customer_info.customer_id = ?;
`;

    const UpdateCustomer_rows = await connection.query(updateCustomerQuery, [
      customer.customer_phone_number,
      customer.customer_first_name,
      customer.customer_last_name,
      customer.active_customer_status,
      customer.customer_id,
    ]);

    console.log("The updated customer information :::", UpdateCustomer_rows);
    if (UpdateCustomer_rows.affectedRows === 0) {
      return false;
    }

    return true;
  } catch (error) {
    console.log("Error updating customer", error);

    return false;
  }
}

// -------- Customer Service ---------
// function to search for a customer
async function searchCustomer(customer_name) {
  try {
    const searchCustomerQuery = `SELECT * FROM customer_info WHERE customer_first_name LIKE ? OR customer_last_name LIKE ?`;
    const searchCustomer_rows = await connection.query(searchCustomerQuery, [
      `%${customer_name}%`,
      `%${customer_name}%`,
    ]);

    if (searchCustomer_rows.length === 0) {
      return false;
    } else {
      return searchCustomer_rows;
    }
  } catch (error) {
    console.log("Error searching for customer", error);
    return false;
  }
}

module.exports = {
  checkIfCustomerExist,
  createNewCustomer,
  getSingleCustomer,
  getAllCustomers,
  editCustomer,
  searchCustomer,
};
