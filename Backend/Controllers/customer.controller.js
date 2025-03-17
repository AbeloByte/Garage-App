// import customer service

const customerService = require("../services/customer.service");

// async function to controlle the add customer
async function addCustomer(req, res, next) {
  try {
    const customerEmail = req.body.customer_email;
    console.log("Customer Email is here :::: ", customerEmail);
    const checkIfCustomerExist = await customerService.checkIfCustomerExist(
      customerEmail
    );
    if (checkIfCustomerExist) {
      res.status(409).json({
        status: "false",
        message: "A Customer  with this email already exists",
      });
    } else {
      const customerInfo = req.body;
      console.log(
        "Customer Information that i get from the client side",
        customerInfo
      );
      const addCustomer = await customerService.createNewCustomer(customerInfo);
      if (!addCustomer) {
        res.status(400).json({
          message:
            " customer-controller 26 : Failed to add the Customer  to the database ",
        });
      } else {
        res.status(200).json({
          status: "true",
          message: "Customer Added Successfully",
        });
      }
    }
  } catch (error) {
    console.log("Error Nekagnn ::::::::::::", error);
    res.status(400).json({
      error:
        "Something went wrong while before Checking and adding the customer",
    });
  }
}

// // function to get a single customer information
async function getCustomerbyId(req, res, next) {
  try {
    //  get the customer information
    const customer_id = req.params.id;
    // get the customer information
    const getCustomer = await customerService.getSingleCustomer(customer_id);

    // check if the customer exist
    if (!getCustomer) {
      res.status(404).json({
        status: "false",
        message: "Customer not found",
      });
    } else {
      res.status(200).json({
        status: "true",
        message: "Customer found",
        data: getCustomer,
      });
    }
  } catch (error) {}
}

// function to get all customer

async function getAllCustomers(req, res, next) {
  try {
    // get all customers

    const allCustomers = await customerService.getAllCustomers();
    if (!allCustomers) {
      res.status(404).json({
        status: "false",
        message: "No Customer found",
      });
    } else {
      res.status(200).json({
        status: "true",
        message: "All Customers found",
        data: allCustomers,
      });
    }
  } catch (error) {}
}

// function to edit customer
async function editCustomer(req, res, next) {
  try {
    const customer_id = req.params.id;
    console.log("Customer ID :::: ", customer_id);
    const customerInfo = req.body;
    console.log("Customer Information  from the client side", customerInfo);

    // call the service to edit the customer
    //

    const editCustomerInfo = await customerService.editCustomer(
      customer_id,
      customerInfo
    );

    console.log("Edit Customer Information :::: ", editCustomerInfo);
    if (!editCustomerInfo) {
      res.status(400).json({
        message:
          "Failed to edit the Customer  to the database, Please try again",
      });
    } else {
      res.status(200).json({
        message: "Customer Edited Successfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      error:
        "Something went wrong while editing the customer information in the controller",
    });
  }
}

// function to search customer
async function searchCustomer(req, res, next) {
  try {
    const customer_name = req.params.name;
    console.log("Customer Name :::: ", customer_name);
    const searchCustomer = await customerService.searchCustomer(customer_name);
    if (!searchCustomer) {
      res.status(404).json({
        status: "false",
        message: "No Customer found",
      });
    } else {
      res.status(200).json({
        status: "true",
        message: "Customer found",
        data: searchCustomer,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "Something went wrong while searching the customer",
    });
  }
}
// export the function
module.exports = {
  addCustomer,
  getCustomerbyId,
  getAllCustomers,
  editCustomer,
  searchCustomer,
};
