import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import customerService from "../../../../services/customer.service";
import vehicleService from "../../../../services/vehicle.service";
import Services_services from "../../../../services/service.service";
import Orders_services from "../../../../services/order.service";

import { Table, Spinner } from "react-bootstrap";
import { ClockFading, Pointer } from "lucide-react";
import { SquarePen } from "lucide-react";
import { X } from "lucide-react";

import { useAuth } from "../../../../context/AuthContext";
// import e from "express";

function AddOrder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [vehicleInfo, setVehicleInfo] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [orderDescription, setOrderDescription] = useState("");
  const [estimatedCompletionDate, setEstimatedCompletionDate] = useState("");
  const [carServices, setCarServices] = useState([]);
  const [loading, setLoading] = useState(false);

  // const [error, setError] = useState(null);

  const [totalPrice, setTotalPrice] = useState(0);
  const { employee_data } = useAuth();
  const employeeId = employee_data?.employee_id;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      if (searchTerm.length > 0) {
        setLoading(true);
        try {
          const response = await customerService.searchCustomer(searchTerm);
          setCustomers(response.data);
        } catch (error) {
          console.error("Error fetching customers:", error);
          setCustomers([]);
        } finally {
          setLoading(false); // Stop loading
        }
      } else {
        setCustomers([]);
      }
    };

    fetchCustomers();
  }, [searchTerm]);

  useEffect(() => {
    if (customer) {
      const fetchVehicles = async () => {
        if (searchTerm.length > 0) {
          setLoading(true);
          try {
            const response = await vehicleService.getCustomerVehicle(
              customer.customer_id
            );

            console.log("Car information", response.data);
            setVehicles(response.data);
          } catch (error) {
            console.error("Error fetching vehicle information:", error);
            setVehicles([]);
          } finally {
            setLoading(false); // Stop loading
          }
        } else {
          setVehicles([]);
        }
      };

      fetchVehicles();
    }
  }, [customer, searchTerm]);

  useEffect(() => {
    if (vehicleInfo) {
      const fetchService = async () => {};
      fetchService();
    }
  }, [vehicleInfo, customer]);

  useEffect(() => {
    if (vehicleInfo && customer) {
      const fetchServices = async () => {
        try {
          const garageServiceResponse =
            await Services_services.getAllServices();

          console.log("Garage Service information", garageServiceResponse.data);
          setCarServices(garageServiceResponse.data);
        } catch (error) {
          console.error("Error fetching Services information:", error);
          setCarServices([]);
        }
      };
      fetchServices();
    }
  }, [vehicleInfo, customer]);

  // function to handle the selection of services
  const handleServiceSelection = (serviceId) => {
    setSelectedServices((prevSelectedServices) => {
      // Check if the service is already selected
      if (prevSelectedServices.includes(serviceId)) {
        // If selected, remove it from the array
        return prevSelectedServices.filter((id) => id !== serviceId);
      } else {
        // If not selected, add it to the array
        return [...prevSelectedServices, serviceId];
      }
    });
  };

  // function to collect prices from the selected services
  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      selectedServices.forEach((serviceId) => {
        const service = carServices.find((s) => s.service_id === serviceId);
        if (service) {
          total += parseFloat(service.service_price);
        }
      });
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [selectedServices, carServices]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      employee_id: employeeId,
      customer_id: customer.customer_id,
      vehicle_id: vehicleInfo.vehicle_id,
      order_description: orderDescription,
      estimated_completion_date: estimatedCompletionDate,
      completion_date: null,
      order_completed: 0,
      totalPrice: totalPrice,
      order_services: selectedServices.map((id) => ({ service_id: id })),
    };

    try {
      const sendOrder = await Orders_services.createOrder(orderData);
      if (sendOrder) {
        navigate("/orders");
      } else {
        console.log("The data is not sending to the back");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-5  contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Search Customers</h2>
        </div>
      </div>
      {loading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {!customer && (
        <div className="search-wrapper d-flex justify-content-center my-4">
          <div className="input-group input-group-lg search-box shadow">
            <input
              type="text"
              className="form-control border-0 p-4 color-dark"
              placeholder="Search by customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}
      {!customer && customers?.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Added Date</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.customer_id}>
                <td>{customer.customer_first_name}</td>
                <td>{customer.customer_last_name}</td>
                <td>{customer.customer_email}</td>
                <td>{customer.customer_phone_number}</td>
                <td>{customer.added_date || "N/A"}</td>
                <td>
                  <button
                    onClick={() => {
                      setCustomer(customer);
                      setCustomers(null);
                    }}
                  >
                    {" "}
                    <Pointer color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {!customer && (!customers || customers?.length === 0) && (
        <div className="form-group col-md-12">
          <button className="theme-btn btn-style-one" type="submit">
            <Link to="/admin/add-customers" className="text-decoration-none">
              {" "}
              <span>Add New Customer</span>
            </Link>
          </button>
        </div>
      )}
      {customer && (
        <>
          <div className="d-flex justify-content-between p-2 bg-white shadow-sm mb-1">
            <div className="">
              <div className=" p-3">
                <h3 className="bold-text ">
                  {customer.customer_first_name +
                    " " +
                    customer.customer_last_name}
                </h3>
                <ul className="list-unstyled pt-3">
                  <li>
                    <strong>Email :</strong> {customer.customer_email}
                  </li>
                  <li>
                    <strong>phone Number: </strong>
                    {customer.customer_email}
                  </li>
                  <li>
                    <strong> Active Customer : </strong>
                    {customer.active_customer_status ? "Yes" : "No"}
                  </li>
                  <li>
                    <strong>Edit customer info: </strong>
                    <Link to={`/admin/customer/${customer.customer_id}`}>
                      <SquarePen color="red" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <button
                onClick={() => {
                  setCustomer(null);
                  setCustomers(null);
                  setVehicleInfo(null);
                  setVehicles(null);
                }}
              >
                {" "}
                <X color="red" />
              </button>
            </div>
          </div>
        </>
      )}
      {customer && !vehicleInfo && (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Year</th>
                <th>Make</th>
                <th>Model</th>
                <th>Tag</th>
                <th>Serial</th>
                <th>Color</th>
                <th>Mileage</th>
                <th>choose</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.vehicle_id}>
                  <td>{vehicle.vehicle_year}</td>
                  <td>{vehicle.vehicle_make}</td>
                  <td>{vehicle.vehicle_model}</td>
                  <td>{vehicle.vehicle_tag}</td>
                  <td>{vehicle.vehicle_serial}</td>
                  <td>{vehicle.vehicle_color}</td>
                  <td>{vehicle.vehicle_mileage}</td>

                  <th>
                    <button
                      onClick={() => {
                        setVehicleInfo(vehicle);
                      }}
                    >
                      {" "}
                      <Pointer color="red" />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      {vehicleInfo && (
        <>
          <div className="d-flex justify-content-between p-2 bg-white shadow-sm mb-1">
            <div className="">
              <div className=" p-3">
                <h3 className="bold-text">{vehicleInfo.vehicle_make}</h3>
                <ul className="pt-3">
                  <li>
                    <strong>Vehicle color :</strong> {vehicleInfo.vehicle_color}
                  </li>
                  <li>
                    <strong>vehicle tag :</strong> {vehicleInfo.vehicle_tag}
                  </li>
                  <li>
                    <strong>vehicle Year :</strong> {vehicleInfo.vehicle_year}
                  </li>
                  <li>
                    <strong>vehicle Mileage :</strong>{" "}
                    {vehicleInfo.vehicle_mileage}
                  </li>
                  <li>
                    <strong>vehicle Serial :</strong>{" "}
                    {vehicleInfo.vehicle_serial}
                  </li>
                  <li>
                    <strong> Edit Vehicle info: </strong>
                    <Link to={`/admin/customer/${vehicleInfo.vehicle_id}`}>
                      <SquarePen color="red" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <button
                onClick={() => {
                  setVehicleInfo(null);
                  setVehicles(null);
                }}
              >
                {" "}
                <X color="red" />
              </button>
            </div>
          </div>
        </>
      )}

      {vehicleInfo && customer && (
        <>
          <form
            className="p-4 bg-white shadow-sm mb-1 mt-2"
            onSubmit={handleSubmit}
          >
            {carServices.map((service) => (
              <div
                key={service.service_id}
                className="p-2 bg-white shadow-sm mb-1"
              >
                {" "}
                {/* Changed to service.service_id */}
                <div className="d-flex justify-content-between align-items-center ">
                  <div className="p-4">
                    <strong>
                      <h4>{service.service_name}</h4>{" "}
                    </strong>
                    <p className="text-muted mb-0">
                      {service.service_description}
                    </p>
                    <span>{service.service_price} Birr</span>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input custom-checkBox"
                      checked={selectedServices.includes(service.service_id)}
                      onChange={() =>
                        handleServiceSelection(service.service_id)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
            <>
              <div className="row clearfix my-5">
                <div className="form-column col-lg-10">
                  <div className="inner-column">
                    <div className="contact-form">
                      <div className="row m-3">
                        <div className="contact-title mb-2 ml-5">
                          <h2>Additional Request</h2>
                        </div>
                        <div className="form-group col-md-12 mx-3 mb-4">
                          <textarea
                            onChange={(e) =>
                              setOrderDescription(e.target.value)
                            }
                            value={orderDescription}
                            type="text"
                            name="description"
                            placeholder="service description"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group col-md-12 mx-3 mb-4">
                <h2>Total Price : {totalPrice} Birr</h2>
              </div>
            </>
            <div className="form-group col-md-12 mx-3 mb-4">
              <label
                htmlFor="estimatedCompletionDate"
                className="form-label fw-semibold text-secondary"
              >
                Estimated Completion Date
              </label>
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-dark text-white border-0">
                  <i className="bi bi-clock"></i>
                </span>
                <input
                  id="estimatedCompletionDate"
                  value={estimatedCompletionDate}
                  onChange={(e) => setEstimatedCompletionDate(e.target.value)}
                  type="datetime-local"
                  name="estimatedCompletionDate"
                  className="form-control border-0 bg-light"
                  required
                />
              </div>
            </div>

            <button className="theme-btn btn-style-one p-4 px-5" type="submit">
              <span>Submit Order</span>
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default AddOrder;
