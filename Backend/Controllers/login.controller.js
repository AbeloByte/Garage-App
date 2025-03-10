// import loging Service
const loginService = require("../Services/login.service");
// // import jwt
const jwt = require("jsonwebtoken");

// import the secret key
const jwtSceret = process.env.JWT_SECRET;
// hanle the login request
async function logIn(req, res, next) {
  try {
    // get the email and password from the request body
    const employeeData = req.body;
    console.log("Login User Inputs", employeeData);

    const employee = await loginService.login(employeeData);

    // if the employee is not found return error
    console.log(employee);

    if (employee.status === "failed") {
      return res.status(403).json({
        status: employee.status,
        message: employee.message,
      });
    }
    // payload using the employee information
    const payload = {
      employee_id: employee.data.employee_id,
      employee_email: employee.data.employee_email,
      employee_role: employee.data.company_role_id,
      employee_first_name: employee.data.employee_first_name,
    };
    // generate a token based on jwt
    const token = jwt.sign(payload, jwtSceret, {
      expiresIn: "10h",
    });
    // return the token
    const sendresponse = {
      employee_token: token,
    };
    return res.status(200).json({
      status: "success",
      message: "Employee Logged In Successfully",
      data: sendresponse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
}

// export the login controller
module.exports = {
  logIn,
};
