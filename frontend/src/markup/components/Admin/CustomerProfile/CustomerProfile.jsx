/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import customerService from "../../../../services/customer.service";
import { useParams } from "react-router-dom";
import vehicleService from "../../../../services/vehicle.service";
import { Link } from "react-router-dom";
import { SquarePen, X } from "lucide-react";
import { Form, Button } from "react-bootstrap";
import user from "../../../../assets/images/icons/user.png";
import vehicle from "../../../../assets/images/icons/vehicle.png";
import OrderInfo from "../../../../assets/images/icons/clipboard.png";

import order from "../../../../assets/images/icons/undraw_towing_e407 (1).svg";
// import { useAuth } from "../../../../context/AuthContext";
import {
  FiCheckCircle,
  FiClock,
  FiMessageSquare,
  FiChevronRight,
} from "react-icons/fi";

function CustomerProfile() {
  const { customerId } = useParams();
  const [vehicles, setVehicles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [vehicle_year, setVehicleYear] = useState("");
  const [vehicle_make, setVehicleMake] = useState("");
  const [vehicle_model, setVehicleModel] = useState("");
  const [vehicle_type, setVehicleType] = useState("");
  const [vehicle_mileage, setVehicleMileage] = useState("");
  const [vehicle_tag, setVehicleTag] = useState("");
  const [vehicle_serial, setVehicleSerial] = useState("");
  const [vehicle_color, setVehicleColor] = useState("");

  const [customer_email, setCustomerEmail] = useState("");
  const [customer_first_name, setCustomerFirstName] = useState("");
  const [customer_last_name, setCustomerLastName] = useState("");
  const [customer_phone_number, setCustomerPhone] = useState("");
  const [active_customer_status, setActiveCustomerStatus] = useState(1);
  const [orders, setOrders] = useState([]);
  const [serverError, setServerError] = useState("");
  const [VehiclesuccesMessage, setVehicleSuccessMessage] = useState("");
  // Fetch customer details on page load
  useEffect(() => {
    if (!customerId) return; // Prevent unnecessary API call if ID is missing

    const fetchCustomer = async () => {
      try {
        const response = await customerService.getCustomerbyID(customerId);
        console.log("Customer data:", response);
        if (response.data) {
          setCustomerEmail(response.data[0].customer_email);
          setCustomerFirstName(response.data[0].customer_first_name);
          setCustomerLastName(response.data[0].customer_last_name);
          setCustomerPhone(response.data[0].customer_phone_number);
          setActiveCustomerStatus(response.data[0].active_customer_status);
        }
      } catch (error) {
        setServerError("Failed to fetch customer details. Please try again.");
        console.error(error);
      }
    };

    fetchCustomer();
  }, [customerId]);

  // Fetch vehicle details attached to this customer
  useEffect(() => {
    if (!customerId) return; // Prevent unnecessary API call if ID is missing

    const fetchVehicles = async () => {
      try {
        const response = await vehicleService.getCustomerVehicle(customerId);
        // console.log("Vehicle data:", response);

        console.log(response);

        if (
          response.status === 200 &&
          response.data &&
          response.data.length > 0
        ) {
          const vehicleData = response.data.map((vehicle) => ({
            id: vehicle.vehicle_id,
            year: vehicle.vehicle_year,
            make: vehicle.vehicle_make,
            model: vehicle.vehicle_model,
            type: vehicle.vehicle_type,
            mileage: vehicle.vehicle_mileage,
            tag: vehicle.vehicle_tag,
            serial: vehicle.vehicle_serial,
            color: vehicle.vehicle_color,
          }));

          setVehicles(vehicleData);
        } else {
          setVehicles([]);
        }
      } catch (error) {
        setServerError("Failed to fetch vehicle details. Please try again.");
        console.error(error);
      }
    };

    fetchVehicles();

    const fetchOrders = async () => {
      try {
        const response = await customerService.getCustomerOrders(customerId);
        console.log("Order data:", response);
        if (response.data) {
          setOrders(response.data);
        }
      } catch (error) {
        setServerError("Failed to fetch order details. Please try again.");
        console.error(error);
      }
    };
    fetchOrders();
  }, [customerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming you would submit formData to an API
      const vehicleData = {
        vehicle_year,
        vehicle_make,
        vehicle_model,
        vehicle_type,
        vehicle_mileage,
        vehicle_tag,
        vehicle_serial,
        vehicle_color,
      };

      // Add vehicle to the database
      const response = await vehicleService.addVehicle(customerId, vehicleData);
      console.log("Vehicle added:", response);
      if (response.status === 200) {
        setVehicleSuccessMessage(response.message);
        // Fetch updated vehicle list
      } else {
        setServerError("Failed to add vehicle. Please try again.");
      }
      ``;
      setShowForm(false);
      // Reset form data after submission
    } catch (error) {
      setServerError("Failed to submit form. Please try again.");
      console.log(error.message);
    }

    window.location.reload();
  };

  return (
    <>
      <div className="container mt-4 my-5">
        <div className="container d-flex">
          <div>
            <img src={user} alt="" width={50} height={50} />
          </div>
          <div className="customer-info-container d-flex align-items-center p-3 rounded">
            <div>
              <h3 className="fw-bold">
                <strong>
                  Customer: {customer_first_name + " " + customer_last_name}
                </strong>
              </h3>
              <h5 className="mb-2">
                <strong>Email:</strong> {customer_email}
              </h5>
              <h5 className="mb-1">
                <strong>Phone Number:</strong> {customer_phone_number}
              </h5>
              <h5 className="mb-1">
                <strong>Active Customer:</strong>{" "}
                {active_customer_status ? "Yes" : "No"}
              </h5>
              <h5 className="mb-0">
                <strong>
                  <Link to={`/admin/customer/${customerId}`}>
                    Edit customer info <SquarePen color="red" />
                  </Link>
                </strong>
              </h5>
            </div>
          </div>
        </div>

        <div className="container mt-4 d-flex gap-2 mb-4">
          <div>
            <img src={vehicle} alt="" width={50} height={50} />
          </div>
          <div>
            <h3 className="px-2">
              <strong>Vehicles of {customer_first_name}</strong>
            </h3>
          </div>
        </div>
        <div>
          {VehiclesuccesMessage && (
            <div className="alert alert-success">{VehiclesuccesMessage}</div>
          )}
        </div>
        {vehicles.length === 0 ? (
          <div className="ml-5 shadow p-3 rounded mt-4">
            <h5 className="ml-4" variant="dark">
              No Vehicle Found
            </h5>
          </div>
        ) : (
          <div className="container table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Vehicle Year</th>
                  <th>Make</th>
                  <th>Model</th>
                  <th>Type</th>
                  <th>Mileage</th>
                  <th>Tag</th>
                  <th>Serial</th>
                  <th>Color</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id}>
                    <td>{vehicle.year}</td>
                    <td>{vehicle.make}</td>
                    <td>{vehicle.model}</td>
                    <td>{vehicle.type}</td>
                    <td>{vehicle.mileage} miles</td>
                    <td>{vehicle.tag}</td>
                    <td>{vehicle.serial}</td>
                    <td>{vehicle.color}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!showForm ? (
          <Button
            className="theme-btn btn-style-one mt-4 ml-5"
            variant="bg-red"
            onClick={() => setShowForm(true)}
          >
            Add New Vehicle
          </Button>
        ) : (
          <div className="position-relative">
            <div className="d-flex justify-content-end">
              <Button
                className="theme-btn mt-4 align-self-end"
                variant="danger"
                onClick={() => setShowForm(false)}
              >
                <X />
              </Button>
            </div>

            <div className="mt-4 justify-content-between shadow p-3 bg-white rounded position-relative">
              <Form onSubmit={handleSubmit}>
                <div className="row clearfix">
                  <div className="form-column col-lg-10">
                    <h2 className="my-5 mx-5">
                      <strong>Add New Vehicle</strong>
                    </h2>
                    <div className="inner-column">
                      <div className="contact-form">
                        <div className="row m-3">
                          <div className="form-group col-md-12 mx-3 mb-4">
                            <input
                              onChange={(event) =>
                                setVehicleYear(event.target.value)
                              }
                              value={vehicle_year}
                              type="text"
                              name="year"
                              placeholder="Vehicle year"
                              required
                            />
                          </div>
                          <div className="form-group col-md-12 mx-3 mb-4">
                            <input
                              onChange={(event) =>
                                setVehicleMake(event.target.value)
                              }
                              value={vehicle_make}
                              type="text"
                              name="make"
                              placeholder="Vehicle make"
                              required
                            />
                          </div>
                          <div className="form-group col-md-12 mx-3 mb-4">
                            <input
                              onChange={(event) =>
                                setVehicleModel(event.target.value)
                              }
                              value={vehicle_model}
                              type="text"
                              name="model"
                              placeholder="Vehicle model"
                              required
                            />
                          </div>
                          <div className="form-group col-md-12 mx-3 mb-4">
                            <input
                              onChange={(event) =>
                                setVehicleType(event.target.value)
                              }
                              value={vehicle_type}
                              type="text"
                              name="type"
                              placeholder="Vehicle type"
                              required
                            />
                          </div>
                          <div className="form-group col-md-12 mx-3 mb-4">
                            <input
                              onChange={(event) =>
                                setVehicleMileage(event.target.value)
                              }
                              value={vehicle_mileage}
                              type="text"
                              name="mileage"
                              placeholder="Vehicle mileage"
                              required
                            />
                          </div>
                          <div className="form-group col-md-12 mx-3 mb-4">
                            <input
                              onChange={(event) =>
                                setVehicleTag(event.target.value)
                              }
                              value={vehicle_tag}
                              type="text"
                              name="tag"
                              placeholder="Vehicle tag"
                              required
                            />
                          </div>
                          <div className="form-group col-md-12 mx-3 mb-4">
                            <input
                              onChange={(event) =>
                                setVehicleSerial(event.target.value)
                              }
                              value={vehicle_serial}
                              type="text"
                              name="serial"
                              placeholder="Vehicle serial"
                              required
                            />
                          </div>
                          <div className="form-group col-md-12 mx-3 mb-4">
                            <input
                              onChange={(event) =>
                                setVehicleColor(event.target.value)
                              }
                              value={vehicle_color}
                              type="text"
                              name="color"
                              placeholder="Vehicle color"
                              required
                            />
                          </div>

                          <button
                            className="theme-btn btn-style-one p-4 px-5"
                            type="submit"
                          >
                            <span>Add Vehicle</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        )}

        {/* Tracking Road Visualization */}
        <div className="container mt-4 d-flex">
          <div>
            <img src={OrderInfo} alt="" width={60} height={60} />
          </div>
          <div>
            <h3 className="px-2">
              <strong>Orders for {customer_first_name}</strong>
            </h3>
          </div>
        </div>

        <div className="orders-list">
          {orders.length === 0 ? (
            <div className="empty-state">
              <img src={order} alt="No orders" className="empty-image" />
              <h4>No orders found</h4>
              <p className="text-muted">
                This customer hasn't placed any orders yet
              </p>
            </div>
          ) : (
            <div className="order-grid">
              {orders.map((order) => (
                <div className="order-card" key={order.order_id}>
                  <div className="order-header">
                    <div className="order-id">ORDER #{order.order_hash}</div>
                    <div
                      className={`order-status ${
                        order.order_status === 1 ? "active" : "completed"
                      }`}
                    >
                      {order.order_status === 1 ? "ACTIVE" : "COMPLETED"}
                    </div>
                  </div>

                  <div className="order-meta">
                    <div className="meta-item">
                      <span className="meta-label">Placed</span>
                      <span className="meta-value">
                        {new Date(order.order_date).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Total</span>
                      <span className="meta-value">
                        ${order.order_total_price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {order.estimated_completion_date && (
                    <div className="timeline">
                      <div className="timeline-item">
                        <div className="timeline-badge"></div>
                        <div className="timeline-content">
                          <span>Estimated completion</span>
                          <span>
                            {new Date(
                              order.estimated_completion_date
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="services-section">
                    <h5>Services Included</h5>
                    <div className="services-grid">
                      {order.services &&
                        [
                          ...new Map(
                            order.services.map((service) => [
                              service.service_name,
                              service,
                            ])
                          ).values(),
                        ].map((service, index) => (
                          <div key={index} className="service-card">
                            <div className="service-icon">
                              {service.service_completed ? (
                                <FiCheckCircle className="completed-icon" />
                              ) : (
                                <FiClock className="pending-icon" />
                              )}
                            </div>
                            <div className="service-details">
                              <h6>{service.service_name}</h6>
                              <p>{service.service_description}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {order.notes_for_customer && (
                    <div className="customer-notes">
                      <div className="notes-header">
                        <FiMessageSquare className="notes-icon" />
                        <span>Customer Notes</span>
                      </div>
                      <p>{order.notes_for_customer}</p>
                    </div>
                  )}

                  {/* <div className="order-footer">
                    <button className="view-details-btn">
                      View Full Details <FiChevronRight className="btn-icon" />
                    </button>
                  </div> */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CustomerProfile;
