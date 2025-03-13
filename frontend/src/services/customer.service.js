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

// export the function
const customerService = {
  addCustomer,
};
export default customerService;
