// import the backend base url from env file
const apiUrl = import.meta.env.VITE_API_URL;

// function to send login data to the backend
const LoginForm = async (loginFormData) => {
  const requestionOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginFormData),
  };

  const response = await fetch(
    `${apiUrl}/api/employee/login`,
    requestionOptions
  );
  return response;
};

const logOut = () => {
  localStorage.removeItem("employee");
};

// create the login service object
const loginservice = {
  LoginForm,
  logOut,
};
export default loginservice;
