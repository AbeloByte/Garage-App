// api url from env

const apiUrl = import.meta.env.VITE_API_URL;
// function for fetching and sending data to the backend

const addVehicle = async (customerId, vehicleData) => {
  const response = await fetch(`${apiUrl}/api/vehicles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerId, vehicleData }), // Attach customerId
  });
  return response.json();
};

// function to fetch vehicle information related to a customer
const getCustomerVehicle = async (customerId) => {
  const response = await fetch(
    `${apiUrl}/api/customer/${customerId}/vehicles/`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // Attach customerId
    }
  );
  return response.json();
};

const vehicle = {
  addVehicle,
  getCustomerVehicle,
};

export default vehicle;
