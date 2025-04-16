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

// router to update the service status
router.put(
  "/api/order/service/update/status/:id",
  orderController.updateServiceStatus
);

// create a route to get an orderd service status for that specific order
router.get(
  "/api/order/service/status/:id",
  orderController.getOrderServiceStatus
);

// create route to get order information using Customer ID
router.get(
  "/api/order/customer/:customerId",
  orderController.getOrderByCustomerId
);

// router to get customer order using hash
router.get("/api/order/customer/hash/:hash", orderController.getOrderByHash);

module.exports = router;
