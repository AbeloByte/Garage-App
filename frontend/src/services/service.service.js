// import apiUrl defined in the .env file
const apiUrl = import.meta.env.VITE_API_URL;

// function to send the Service data to the server
const addService = async (serviceData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(serviceData),
  };
  const response = await fetch(`${apiUrl}/api/add-services`, requestOptions);
  return response;
};
// function to get all services
const getAllServices = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(`${apiUrl}/api/services`, requestOptions);

  return response.json();
};
// function to edit service information
const editServiceInfo = async (serviceId, updatedData) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  };
  const response = await fetch(
    `${apiUrl}/api/service/edit/${serviceId}`,
    requestOptions
  );
  return response.json();
};

// function to get service information by id
const getServiceById = async (service_id) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    `${apiUrl}/api/service/${service_id}`,
    requestOptions
  );
  return response.json();
};
// function to delete service information
const deleteService = async (service_id) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    `${apiUrl}/api/service/delete/${service_id}`,
    requestOptions
  );
  return response.json();
};

// service.js

const updateServiceStatus = async (serviceId, newStatus) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ active_status: newStatus }),
  };

  const response = await fetch(
    `${apiUrl}/api/service/status/${serviceId}`,
    requestOptions
  );
  return response.json();
};

const Services_services = {
  addService,
  getAllServices,
  editServiceInfo,
  deleteService,
  getServiceById,
  updateServiceStatus,
};

export default Services_services;
