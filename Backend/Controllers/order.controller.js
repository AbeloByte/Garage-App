// // import order service
// const orderService = require("../services/order.service");

// // a function to controlle the add order

// async function createOrder(req, res, next) {
//   try {
//     const orderInfo = req.body;
//     console.log("Order Information that i get from the client side", orderInfo);
//     const addOrder = await orderService.createNewOrder(orderInfo);
//     if (!addOrder) {
//       res.status(400).json({
//         message:
//           " order-controller 26 : Failed to add the order to the database ",
//       });
//     } else {
//       res.status(200).json({
//         status: "true",
//         message: "Order Added Successfully",
//       });
//     }
//   } catch (error) {
//     console.log("Error  ::::::::::::", error);
//     res.status(400).json({
//       error: "Something went wrong while before Checking and adding the order",
//     });
//   }
// }

// //

// module.exports = {
//   createOrder,
// };
