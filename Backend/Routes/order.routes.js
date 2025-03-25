// import express
const express = require("express");
//  call the router method from the express
const router = express.Router();

// import the order  controller
const orderController = require("../Controllers/order.controller");

// create a route to handle the login req
router.post("/api/order", orderController.createNewOrder);

// create a route to get all orders
router.get("/api/orders", orderController.getAllOrders);

// create a route to get a single order
router.get("/api/order/:id", orderController.getSingleOrder);

module.exports = router;
