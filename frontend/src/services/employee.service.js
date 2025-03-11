/* eslint-disable no-unused-vars */
// import apiUrl form the environment file
const apiUrl = import.meta.env.VITE_API_URL;
// function for fetching and sending data to the backend
const addEmployee = async (newEmployeeformData) => {
  const requestionOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newEmployeeformData),
  };

  const response = await fetch(`${apiUrl}/api/employee`, requestionOptions);
  return response;
};

// export the function
const employeeService = {
  addEmployee,
};
export default employeeService;
