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

// export the function
module.exports = {
  addCustomer,
};
