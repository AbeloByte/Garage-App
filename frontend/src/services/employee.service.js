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

// export the function
const employeeService = {
  addEmployee,
  getAllEmployee,
};
export default employeeService;
