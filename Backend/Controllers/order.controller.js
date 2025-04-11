// import order service
const { logger } = require("../libs/common");
const orderService = require("../services/order.service");

// // a function to controlle the add order

async function createNewOrder(req, res, next) {
  try {
    const orderInfo = req.body;

    logger.log("Order Information that i get from the client side", orderInfo);
    const addOrder = await orderService.createOrder(orderInfo);
    if (!addOrder) {
      res.status(400).json({
        message:
          " order-controller 26 : Failed to add the order to the database ",
      });
    } else {
      res.status(200).json({
        status: "true",
        message: "Order Added Successfully",
      });
    }
  } catch (error) {
    logger.log("Error  ::::::::::::", error);
    res.status(400).json({
      error: "Something went wrong while before Checking and adding the order",
    });
  }
}

//a function to get all orders
async function getAllOrders(req, res, next) {
  try {
    const orders = await orderService.getAllOrders();
    if (!orders) {
      res.status(400).json({
        message: "Failed to fetch orders",
      });
    } else {
      res.status(200).json({
        message: "Orders fetched successfully",
        data: orders,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while fetching orders",
    });
  }
}

//a function to get a single order
async function getSingleOrder(req, res, next) {
  try {
    const id = req.params.id;
    const order = await orderService.getSingleOrder(id);
    if (!order) {
      res.status(400).json({
        message: "Failed to fetch order",
      });
    } else {
      res.status(200).json({
        message: "Order fetched successfully",
        data: order,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while fetching order",
    });
  }
}

// function to update the service status
async function updateServiceStatus(req, res, next) {
  try {
    const orderId = req.params.id;
    const { serviceId, newStatus } = req.body; // Directly destructure from body

    // console.log("the order id is : ", orderId);
    // console.log("the service id is : ", serviceId);
    // console.log("the status is : ", newStatus);

    // Validate input
    if (!serviceId || newStatus === undefined) {
      return res.status(400).json({
        message: "Missing service_id or status in request body",
      });
    }

    // Call service to update a single service
    const result = await orderService.updateServiceStatus(
      orderId,
      serviceId,
      newStatus
    );

    res.status(200).json({
      message: "Service status updated",
      data: result,
    });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ message: error.message });
  }
}

// function to update the Orderd service status
async function getOrderServiceStatus(req, res, next) {
  try {
    const orderId = req.params.id;

    console.log("the order id is : ", orderId);
    const serviceStatus = await orderService.getOrder_ServiceStatus(orderId);
    if (!serviceStatus) {
      res.status(400).json({
        message: "Failed to fetch order service status",
      });
    } else {
      res.status(200).json({
        message: "Order service status fetched successfully",
        data: serviceStatus,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while fetching order service status",
    });
  }
}

// function to get customer order information using customer ID
async function getOrderByCustomerId(req, res, next) {
  try {
    const customerId = req.params.customerId;
    const order = await orderService.getOrderByCustomerId(customerId);
    if (!order) {
      res.status(400).json({
        message: "Failed to fetch order",
      });
    } else {
      res.status(200).json({
        message: "Order fetched successfully",
        data: order,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while fetching order",
    });
  }
}

module.exports = {
  createNewOrder,
  getAllOrders,
  getSingleOrder,
  updateServiceStatus,
  getOrderServiceStatus,
  getOrderByCustomerId,
};
