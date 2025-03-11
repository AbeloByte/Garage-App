// function to read data from localstorage
const getAuth = async () => {
  const employee_data = await JSON.parse(localStorage.getItem("employee"));
  //   console.log(employee_data.employee_token);
  if (employee_data && employee_data.employee_token) {
    const decode = await decodeTokenPayload(employee_data.employee_token);
    employee_data.employee_role = decode.employee_role;
    employee_data.employee_first_name = decode.employee_first_name;
    employee_data.employee_id = decode.employee_id;
  } else {
    return null;
  }
  return employee_data;
};

// function to decode the payload
const decodeTokenPayload = async (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const payload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(payload);
};

// function to export
export default getAuth;
