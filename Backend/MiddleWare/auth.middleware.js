// import dotenv
require("dotenv").config();

// import employee service
const employeeService = require("../services/employee.service");
// import jwt
const jwt = require("jsonwebtoken");

// function to verify token
const verifyToken = async (req, res, next) => {
  // get the token from the header
  const token = req.headers["x-access-token"];

  // if token is not provided
  if (!token) {
    return res.status(403).json({
      status: "fail",
      message: "No token provided!",
    });
  }

  // verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized!",
      });
    }
    req.employee_email = decoded.employee_email;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  const employeeEmail = req.employee_email;
  console.log("Employee Email ::::: ", employeeEmail);
  const employee = await employeeService.getEmployeeByEmail(employeeEmail);
  console.log("Iam from middleWare", employee);

  if (employee.company_role_id === 3) {
    console.log("******************** ", employee.company_role_id);
    next();
  } else {
    return res.status(403).send({
      status: "fail",
      error: "Not An Admin",
    });
  }
};
const authmiddleware = { verifyToken, isAdmin };
// export the function
module.exports = authmiddleware;
