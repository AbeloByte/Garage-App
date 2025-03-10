//  import the dotenv file to read the environment variables
require("dotenv").config();
//  import express module
const express = require("express");
// import sanitize
const sanitize = require("sanitize");

// import cors module
const cors = require("cors");
// create an express app
const app = express();

app.use(express.json());
// use cors
app.use(
  cors({
    origin: process.env.FrontendURL, //  frontend URL
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
//  sanitizer middleware
app.use(sanitize.middleware);

// import the routes
const routes = require("./Routes");
// use the routes
app.use(routes);

// create a port variable to listen to the port
const port = process.env.PORT || 3000;

// listen the port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// export the app
module.exports = app;
