// import order service
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

module.exports = {
  createNewOrder,
  getAllOrders,
  getSingleOrder,
};
