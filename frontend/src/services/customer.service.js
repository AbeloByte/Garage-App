// import the env variable
const apiUrl = import.meta.env.VITE_API_URL;

//  function to send the data to the server

const addCustomer = async (CustomerFormData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(CustomerFormData),
  };
  const response = await fetch(`${apiUrl}/api/customer`, requestOptions);
  return response;
};

// funciton to get all customers

const getAllCustomers = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    "x-access-token": token,
  };
  const response = await fetch(`${apiUrl}/api/all-customers`, requestOptions);
  return response;
};

// function to edit customer information
const editCustomerInfo = async (customerId, updatedData) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },

    body: JSON.stringify(updatedData), // Only stringify updatedData
  };
  const response = await fetch(
    `${apiUrl}/api/customer/edit/${customerId}`,
    requestOptions
  );
  return response.json(); // Convert response to JSON
};

// function to get a customer information
const getCustomerbyID = async (customerId) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    `${apiUrl}/api/customer/${customerId}`,
    requestOptions
  );
  return response.json(); // Convert response to JSON
};

// function to search for a customer
const searchCustomer = async (searchTerm) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    `${apiUrl}/api/customer/search/${searchTerm}`,
    requestOptions
  );
  return response.json(); // Convert response to JSON
};

// export the function
const customerService = {
  addCustomer,
  getAllCustomers,
  editCustomerInfo,
  getCustomerbyID,
  searchCustomer,
};
export default customerService;
