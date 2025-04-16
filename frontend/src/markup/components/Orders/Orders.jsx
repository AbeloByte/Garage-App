import React, { useEffect, useState } from "react";
import Orders_services from "../../../services/order.service";
import { Table, Badge, Modal, Form, Button } from "react-bootstrap";
import { ExternalLink, SquarePen, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
function Orders() {
  const setOrderId = useAuth();
  console.log("Show the output of setOrder Id", setOrderId);
  // const [orderId,set_OrderId]
  const [Orders, setOrders] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [individualOrder, setindividualOrder] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingService, setUpdatingService] = useState(null); // Track which service is being updated
  // eslint-disable-next-line no-unused-vars
  const [serviceStatusDrafts, setServiceStatusDrafts] = useState({});
  const [error, setError] = useState("");

  const [customer_order_Services, setCustomerOrderServices] = useState([]);

  useEffect(() => {
    try {
      const fetchOrders = async () => {
        const response = await Orders_services.getAllOrders();
        setOrders(response.data);
        // setLoading(false);
      };
      fetchOrders();
    } catch (error) {
      console.error("Error fetching orders:", error);
      // setLoading(false);
    }
  }, []);

  const fetchOrderServicesStatus = async (orderId) => {
    try {
      const response = await Orders_services.getOrderServicesStatus(orderId);
      console.log("The ordered service status :::: ", response.data);

      if (response) {
        setCustomerOrderServices(response.data);
      } else {
        console.log("The ordered service status is not found");
      }
    } catch (error) {
      console.error("Error fetching ordered service status:", error);
    }

    // Set the orderId in the context
  };

  const handleServiceStatusChange = async (orderId, serviceId, newStatus) => {
    try {
      // console.log("The new service is", serviceId);
      // set_OrderId(orderId); // Set the orderId in the context
      // ✅ Safely update the Orders state
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order.order_id === orderId) {
            return {
              ...order,
              services: (order.services || []).map((service) =>
                service.service_id === serviceId
                  ? { ...service, service_completed: newStatus }
                  : service
              ),
            };
          }
          return order;
        })
      );

      // ✅ Safely update the selectedOrder state
      if (selectedOrder?.order_id === orderId) {
        setSelectedOrder((prev) => ({
          ...prev,
          services: (prev.services || []).map((service) =>
            service.service_id === serviceId
              ? { ...service, service_completed: newStatus }
              : service
          ),
        }));
      } else {
        setError("There is an Error while update the selected Order state");
      }

      const orderInfo = {
        serviceId: serviceId,
        newStatus: newStatus,
      };
      await Orders_services.updateOrderStatus(orderId, orderInfo);

      console.log("OrderId", orderId);
      console.log("ServiceId", serviceId);
      console.log("The updated service status is", newStatus);
    } catch (error) {
      console.error("Error updating service status:", error);
    } finally {
      setUpdatingService(null); // remove loading
    }
  };

  // Your status badge remains the same
  const getStatusBadge = (status) => {
    const cleanStatus = status.replace(/[()]/g, "").trim().toLowerCase();
    switch (cleanStatus) {
      case "complete":
        return (
          <Badge bg="success" className="p-2 border text-white">
            {status}
          </Badge>
        );
      case "in progress":
        return (
          <Badge bg="warning" text="gray" className="p-2 border">
            {status}
          </Badge>
        );
      case "in course":
        return <Badge bg="info">{status}</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  useEffect(() => {
    try {
      const fetchSingleOrder = async () => {
        if (selectedOrder) {
          const response = await Orders_services.getOrderById(
            selectedOrder.order_id
          );
          setSelectedOrder(response.data);
        }
      };

      fetchSingleOrder();
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }, []);

  console.log(
    "The Customer Order Informatio is like ",
    customer_order_Services
  );
  return (
    <div className="table-responsive">
      {error && (
        <div>
          <h2>{error}</h2>
        </div>
      )}
      <Table striped bordered hover className="mt-4">
        <thead className="table-dark">
          <tr>
            <th>Order Id</th>
            <th>Customer</th>
            <th>Vehicle</th>
            <th>Order Date</th>
            <th>Received by</th>
            <th>Order status</th>
            <th>View/Edit</th>
          </tr>
        </thead>
        <tbody>
          {Orders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>
                <div className="d-flex flex-column">
                  <strong>{order.customer_name}</strong>
                  <span>{order.customer_email}</span>
                  <span>{order.customer_phone_number}</span>
                </div>
              </td>
              <td>
                <div className="d-flex flex-column">
                  <strong>{order.vehicle_model}</strong>
                  <small>Year: {order.vehicle_year}</small>
                  <small>License: {order.vehicle_tag}</small>
                </div>
              </td>
              <td>{order.order_date}</td>
              <td>{order.employee_name}</td>
              <td>{getStatusBadge(order.order_status)}</td>
              <td>
                <div className="d-flex gap-3">
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      fetchOrderServicesStatus(order.order_id);
                      setSelectedOrder(order);
                      setShowEditModal(true);
                    }}
                  >
                    <SquarePen className="hover-effect space" />
                  </span>

                  <Link to={`/Orders/${order.order_id}`}>
                    <ExternalLink className="hover-effect space" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Order Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        size="lg"
        centered
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>Order #{selectedOrder?.order_id} Details</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modal-body-custom">
          {/* Order Information Section */}
          <div className="mb-4 p-3 border rounded">
            <h5>Order Information</h5>
            <div className="row">
              <div className="col-md-6">
                <p>
                  <strong>Customer:</strong> {selectedOrder?.customer_name}
                </p>
                <p>
                  <strong>Vehicle:</strong> {selectedOrder?.vehicle_model} (
                  {selectedOrder?.vehicle_year})
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Status:</strong> {selectedOrder?.order_status}
                </p>
                <p>
                  <strong>Received by:</strong> {selectedOrder?.employee_name}
                </p>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="mb-4">
            <h5>Services</h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Current Status</th>
                  <th>Update Status</th>
                </tr>
              </thead>
              <tbody>
                {customer_order_Services?.map((service) => (
                  <tr key={service.service_id}>
                    <td>{service.service_name}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Form.Select
                          value={
                            serviceStatusDrafts[service.service_id] ??
                            (service.service_completed ? 1 : 0)
                          }
                          onChange={(e) => {
                            const newStatus = parseInt(e.target.value);
                            {
                              console.log(service.service_id);
                            }
                            handleServiceStatusChange(
                              selectedOrder?.order_id,
                              service.service_id,
                              newStatus
                            );
                          }}
                          disabled={updatingService === service.service_id}
                          className="form-select-sm"
                        >
                          <option value={0}>Pending</option>
                          <option value={1}>Completed</option>
                        </Form.Select>

                        <Button
                          variant="outline-primary"
                          size="sm"
                          disabled={
                            updatingService === service.service_id ||
                            serviceStatusDrafts[service.service_id] ===
                              (service.service_completed ? 1 : 0)
                          }
                          onClick={() =>
                            handleServiceStatusChange(
                              selectedOrder.order_id,
                              service.service_id,
                              serviceStatusDrafts[service.service_id]
                            )
                          }
                        >
                          {updatingService === service.service_id ? (
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                            ></span>
                          ) : (
                            "Update"
                          )}
                        </Button>
                      </div>
                    </td>

                    <td>
                      {updatingService === service.service_id ? (
                        <div
                          className="spinner-border spinner-border-sm"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        <Form.Select
                          value={service.service_completed ? 1 : 0}
                          onChange={(e) => {
                            const newStatus = parseInt(e.target.value);
                            handleServiceStatusChange(
                              selectedOrder.order_id,
                              service.service_id,
                              newStatus
                            );
                          }}
                          disabled={updatingService === service.service_id}
                        >
                          <option value={0}>Pending</option>
                          <option value={1}>Completed</option>
                        </Form.Select>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Orders;
