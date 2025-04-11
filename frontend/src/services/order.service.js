// api url for order from env
const apiUrl = import.meta.env.VITE_API_URL;

// function to create a send new customer order specific to that user to the back

const createOrder = async (orderData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  };
  const response = await fetch(`${apiUrl}/api/order`, requestOptions);
  return response.json();
};

// function to get all orders for the user
const getAllOrders = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(`${apiUrl}/api/orders`, requestOptions);
  return response.json();
};

// function to get a single order information by id

const getOrderById = async (orderId) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    `${apiUrl}/api/order/${orderId}`,
    requestOptions
  );

  return response.json();
};

//  function to update the order status informations
const updateOrderStatus = async (orderId, orderData) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  };
  const response = await fetch(
    `${apiUrl}/api/order/service/update/status/${orderId}`,
    requestOptions
  );
  return response.json();
};

// function to get the orderd_service information by id
const getOrderServicesStatus = async (orderId) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    `${apiUrl}/api/order/service/status/${orderId}`,
    requestOptions
  );
  return response.json();
};

const Orders_services = {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
  getOrderServicesStatus,
};

export default Orders_services;
