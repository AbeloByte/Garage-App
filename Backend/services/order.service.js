// database connection
const { logger } = require("../libs/common");

const connection = require("../Config/dbconfig");

// create a new order

// import employee service
const employeeService = require("../services/employee.service");

// import vehicle service
const vehicleService = require("../services/vehicle.service");

// import customer service
const customerService = require("../services/customer.service");

async function createOrder(orderInfo) {
  try {
    // Generate a unique hash for the order
    const order_hash = `hash_${Date.now()}`;

    // Insert into `orders` table
    const orderQuery = `
      INSERT INTO orders (employee_id, customer_id, vehicle_id, active_order, order_hash) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const orderResult = await connection.query(orderQuery, [
      orderInfo.employee_id,
      orderInfo.customer_id,
      orderInfo.vehicle_id,
      1, // active_order (1 indicates active)
      order_hash,
    ]);

    if (orderResult.affectedRows === 0) {
      throw new Error("Failed to create order");
    }

    const orderId = orderResult.insertId;

    // Insert into `order_info` table
    const orderInfoQuery = `
      INSERT INTO order_info (order_id, order_total_price, estimated_completion_date, completion_date, additional_request, additional_requests_completed) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await connection.query(orderInfoQuery, [
      orderId,
      orderInfo.totalPrice, // order_total_price (set to 0 initially, can be updated later)
      orderInfo.estimated_completion_date &&
      orderInfo.estimated_completion_date.trim() !== ""
        ? orderInfo.estimated_completion_date.split(".")[0]
        : null, // Set to NULL if empty

      orderInfo.completion_date || null,
      orderInfo.order_description && orderInfo.order_description.trim() !== ""
        ? orderInfo.order_description
        : null, // Convert empty descriptions to NULL

      0, // additional_requests_completed
    ]);
    // Insert into `order_services` table for each service
    const orderServicesQuery = `
      INSERT INTO order_services (order_id, service_id, service_completed) 
      VALUES (?, ?, ?)
    `;
    for (const service of orderInfo.order_services) {
      await connection.query(orderServicesQuery, [
        orderId,
        service.service_id,
        0,
      ]); // service_completed = 0

      // ----- ------ -----
      const orderStatusQuery = `
  INSERT INTO order_status (order_id, order_status) 
  VALUES (?, ?)
`;
      await connection.query(orderStatusQuery, [orderId, 0]); // 0 = initial status
    }

    return { success: true, orderId };
  } catch (error) {
    console.error("Error creating order:", error.message);
    return { success: false, error: error.message };
  }
}

// function getAllOrders information
async function getAllOrders() {
  try {
    const query = `
      SELECT 
          o.order_id,
          DATE_FORMAT(o.order_date, '%d/%m/%Y') AS order_date,
          CONCAT(ci.customer_first_name, ' ', ci.customer_last_name) AS customer_name,
          c.customer_email,
          c.customer_phone_number,
          CONCAT(cvi.vehicle_make, ' ', cvi.vehicle_model) AS vehicle_info,
          cvi.vehicle_year,
          cvi.vehicle_tag,
          cvi.vehicle_model,
          cvi.vehicle_serial,
          CONCAT(ei.employee_first_name, ' ', ei.employee_last_name) AS employee_name,
          CASE os.order_status
              WHEN 1 THEN 'Complete'
              WHEN 0 THEN 'in progress'
              WHEN 3 THEN 'in course'
              ELSE 'Unknown'
          END AS order_status
      FROM orders o
      LEFT JOIN customer_identifier c ON o.customer_id = c.customer_id
      LEFT JOIN customer_info ci ON c.customer_id = ci.customer_id
      LEFT JOIN customer_vehicle_info cvi ON o.vehicle_id = cvi.vehicle_id
      LEFT JOIN employee e ON o.employee_id = e.employee_id
      LEFT JOIN employee_info ei ON e.employee_id = ei.employee_id
      LEFT JOIN (
          SELECT order_id, MAX(order_status_id) AS latest_status_id
          FROM order_status
          GROUP BY order_id
      ) latest_os ON o.order_id = latest_os.order_id
      LEFT JOIN order_status os ON latest_os.latest_status_id = os.order_status_id
      ORDER BY o.order_id DESC;
    `;

    const orders = await connection.query(query);
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

// function to get singel Order
async function getSingleOrder(order_id) {
  try {
    const customer_order = `SELECT 
    o.order_id,
    DATE_FORMAT(o.order_date, '%d/%m/%Y') AS order_date,
    CONCAT(ci.customer_first_name, ' ', ci.customer_last_name) AS customer_name,
    c.customer_email,
    c.customer_phone_number,
    CONCAT(cvi.vehicle_make, ' ', cvi.vehicle_model) AS vehicle_info,
    cvi.vehicle_year,
    cvi.vehicle_tag,
    cvi.vehicle_model,
    cvi.vehicle_serial,
    CONCAT(ei.employee_first_name, ' ', ei.employee_last_name) AS employee_name,
    CASE os.order_status
        WHEN 1 THEN 'Complete'
        WHEN 0 THEN 'in progress'
        WHEN 3 THEN 'in course'
        ELSE 'Unknown'
    END AS order_status,
    ar.additional_requests_completed
FROM orders o
LEFT JOIN customer_identifier c ON o.customer_id = c.customer_id
LEFT JOIN customer_info ci ON c.customer_id = ci.customer_id
LEFT JOIN customer_vehicle_info cvi ON o.vehicle_id = cvi.vehicle_id
LEFT JOIN employee e ON o.employee_id = e.employee_id
LEFT JOIN employee_info ei ON e.employee_id = ei.employee_id
LEFT JOIN (
    SELECT order_id, MAX(order_status_id) AS latest_status_id
    FROM order_status
    GROUP BY order_id
) latest_os ON o.order_id = latest_os.order_id
LEFT JOIN order_status os ON latest_os.latest_status_id = os.order_status_id
LEFT JOIN additional_request ar ON o.order_id = ar.order_id
ORDER BY o.order_id DESC;

`;

    const order = await connection.query(customer_order, [order_id]);
    if (order.length === 0) {
      throw new Error("Order not found");
    }
    return order;
  } catch (error) {}
}

// function to update the order informatinons   and status
async function updateOrderStatus(orderId) {
  try {
    // 1. Get service completion status
    const services = await connection.query(
      `SELECT 
        COUNT(*) AS total,
        SUM(service_completed = 1) AS completed
       FROM order_services
       WHERE order_id = ?`,
      [orderId]
    );

    const [result] = services;
    if (!services || services.length === 0) {
      throw new Error(`No services found for order ${orderId}`);
    }

    const { total, completed } = result;
    const totalServices = Number(total) || 0;
    const completedServices = Number(completed) || 0;

    // 2. Check additional request (if exists)
    const additionalReq = await connection.query(
      `SELECT additional_requests_completed 
       FROM additional_request 
       WHERE order_id = ?`,
      [orderId]
    );

    let additionalCompleted = true; // Default to true if not exists
    if (additionalReq.length > 0) {
      additionalCompleted =
        additionalReq[0].additional_requests_completed === 1;
    }

    // 3. Determine if order should be marked complete
    const allServicesDone =
      totalServices > 0 && totalServices === completedServices;
    const shouldMarkComplete = allServicesDone && additionalCompleted;

    let statusChanged = false;
    if (shouldMarkComplete) {
      const updateResult = await connection.query(
        `UPDATE order_status 
         SET order_status = 1 
         WHERE order_id = ? AND order_status = 0;`,
        [orderId]
      );
      statusChanged = updateResult.affectedRows > 0;
    }

    return {
      success: true,
      orderId,
      currentStatus: shouldMarkComplete ? 1 : 0,
      statusChanged,
      servicesCompleted: completedServices,
      totalServices,
      additionalRequestCompleted: additionalCompleted,
    };
  } catch (error) {
    console.error(`Order ${orderId} status update failed:`, error.message);
    throw new Error(`Could not update order status: ${error.message}`);
  }
}

// function to update the service status
async function updateServiceStatus(orderId, serviceId, status) {
  try {
    {
      const query = `
          UPDATE order_services
          SET service_completed = ?
          WHERE order_id = ? AND service_id = ?
        `;
      const Order_result = await connection.query(query, [
        status,
        orderId,
        serviceId,
      ]);
      if (Order_result.affectedRows === 0) {
        throw new Error("Failed to update service status");
      }
      // Update the order status based on the service completion

      const statusResult = await updateOrderStatus(orderId);
      if (!statusResult) {
        throw new Error("Failed to update order status");
      }
      // Check if the order is completed

      return { success: true, message: "Service status updated successfully" };
    }
  } catch (error) {
    console.error("Error updating service status:", error);
    throw error;
  }
}

// function to get the order service status
async function getOrder_ServiceStatus(orderId) {
  try {
    const query = `SELECT 
    cs.service_id,
    cs.service_name,
    os.service_completed
FROM 
    orders o
JOIN 
    order_services os ON o.order_id = os.order_id
JOIN 
    common_services cs ON os.service_id = cs.service_id
WHERE 
    o.order_id = ?

`;

    const result = await connection.query(query, [orderId]);
    if (result.length === 0) {
      throw new Error("No services found for this order");
    }
    return result;
  } catch (error) {
    console.error("Error fetching order service status:", error);
    throw error;
  }
}

// function to get order by customer id
async function getOrderByCustomerId(customerId) {
  try {
    const getOrderInfo = `SELECT 
  o.order_id,
  o.order_date,
  o.active_order,
  o.order_hash,

  oi.order_total_price,
  oi.estimated_completion_date,
  oi.completion_date,
  oi.additional_request,
  oi.notes_for_internal_use,
  oi.notes_for_customer,
  oi.additional_requests_completed,

  os.order_status,

  (
    SELECT JSON_ARRAYAGG(
      JSON_OBJECT(
        'service_name', cs.service_name,
        'service_description', cs.service_description,
        'service_completed', osvc.service_completed
      )
    )
    FROM order_services osvc
    JOIN common_services cs ON osvc.service_id = cs.service_id
    WHERE osvc.order_id = o.order_id
  ) AS services

FROM orders o
JOIN order_info oi ON o.order_id = oi.order_id
LEFT JOIN order_status os ON o.order_id = os.order_id

WHERE o.customer_id = ?

GROUP BY 
  o.order_id,
  o.order_date,
  o.active_order,
  o.order_hash,
  oi.order_total_price,
  oi.estimated_completion_date,
  oi.completion_date,
  oi.additional_request,
  oi.notes_for_internal_use,
  oi.notes_for_customer,
  oi.additional_requests_completed,
  os.order_status

LIMIT 0, 25;`;

    const order = await connection.query(getOrderInfo, [customerId]);
    if (order.length === 0) {
      throw new Error("No orders found for this customer");
    }
    return order;
  } catch (error) {
    console.error("Error fetching order by customer ID:", error);
    throw error;
  }
}

// Function to get order by order_hash
async function getOrderByHash(orderHash) {
  try {
    const getOrderInfo = `SELECT 
      o.order_id,
      o.order_date,
      o.active_order,
      o.order_hash,

      -- Customer Information
      ci.customer_email,
      ci.customer_phone_number,
      c_info.customer_first_name,
      c_info.customer_last_name,

      -- Vehicle Information
      cv.vehicle_year,
      cv.vehicle_make,
      cv.vehicle_model,
      cv.vehicle_type,
      cv.vehicle_mileage,
      cv.vehicle_tag,
      cv.vehicle_serial,
      cv.vehicle_color,

      -- Order Information
      oi.order_total_price,
      oi.estimated_completion_date,
      oi.completion_date,
      oi.additional_request,
      oi.notes_for_customer,
      oi.additional_requests_completed,

      -- Status Information
      os.order_status,

      -- Services
      (
        SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
            'service_name', cs.service_name,
            'service_description', cs.service_description,
            'service_completed', osvc.service_completed
          )
        )
        FROM order_services osvc
        JOIN common_services cs ON osvc.service_id = cs.service_id
        WHERE osvc.order_id = o.order_id
      ) AS services

    FROM orders o
    -- Customer Tables
    JOIN customer_identifier ci ON o.customer_id = ci.customer_id
    LEFT JOIN (
      SELECT customer_id, customer_first_name, customer_last_name
      FROM customer_info
      WHERE (customer_id, customer_info_id) IN (
        SELECT customer_id, MAX(customer_info_id)
        FROM customer_info
        GROUP BY customer_id
      )
    ) c_info ON o.customer_id = c_info.customer_id
    -- Vehicle Table
    JOIN customer_vehicle_info cv ON o.vehicle_id = cv.vehicle_id
    -- Order Tables
    JOIN order_info oi ON o.order_id = oi.order_id
    LEFT JOIN (
      SELECT order_id, order_status
      FROM order_status
      WHERE (order_id, order_status_id) IN (
        SELECT order_id, MAX(order_status_id)
        FROM order_status
        GROUP BY order_id
      )
    ) os ON o.order_id = os.order_id

    WHERE o.order_hash = ?
    LIMIT 1;`;

    const [order] = await connection.query(getOrderInfo, [orderHash]);
    if (!order) throw new Error("Order not found");
    return order;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateServiceStatus,
  getOrder_ServiceStatus,
  getOrderByCustomerId,
  getOrderByHash,
};
