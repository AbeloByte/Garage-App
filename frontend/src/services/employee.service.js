/* eslint-disable no-unused-vars */
// import apiUrl form the environment file
const apiUrl = import.meta.env.VITE_API_URL;
// function for fetching and sending data to the backend
const addEmployee = async (newEmployeeformData, loggedinEmployeeToken) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedinEmployeeToken,
    },
    body: JSON.stringify(newEmployeeformData, loggedinEmployeeToken),
  };

  const response = await fetch(`${apiUrl}/api/employee`, requestOptions);
  return response;
};

// getAll Employee Function

const getAllEmployee = async (token) => {
  //

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${apiUrl}/api/employees`, requestOptions);
  return response;
};

// function to edit employee information
const editemployeeInfo = async (employeeId, updatedData) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },

    body: JSON.stringify(updatedData), // Only stringify updatedData
  };
  const response = await fetch(
    `${apiUrl}/api/employee/${employeeId}`,
    requestOptions
  );
  return response.json(); // Convert response to JSON
};

// function to get a employee information
const getemployeebyID = async (employeeId) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    `${apiUrl}/api/employee/${employeeId}`,
    requestOptions
  );
  return response.json(); // Convert response to JSON
};

// function to delete employee information
const deleteEmployee = async (employeeId) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    `${apiUrl}/api/employee/delete/${employeeId}`,
    requestOptions
  );
  return response.json(); // Convert response to JSON
};

// export the function
const employeeService = {
  addEmployee,
  getAllEmployee,
  getemployeebyID,
  editemployeeInfo,
  deleteEmployee,
};
export default employeeService;
