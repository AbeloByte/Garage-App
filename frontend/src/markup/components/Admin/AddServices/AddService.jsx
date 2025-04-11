/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Services_services from "../../../../services/service.service";
import { Form } from "react-bootstrap";
import { Trash2, SquarePen, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
function AddService() {
  const [service_name, setService_name] = useState("");
  const [service_description, setServiceDescription] = useState("");
  const [service_price, setServicePrice] = useState("");
  const [services, setServices] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [successOnDelete, setSuccessOnDelete] = useState(false);
  const [errorOnDelete, setErrorOnDelete] = useState(false);
  // errors
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      const get_services = await Services_services.getAllServices();
      console.log("List of Services ", services);
      if (get_services) {
        setServices(get_services.data);
      } else {
        setServerError("Something went wrong while fetching the services");
        console.log("Services fetched successfully");
        return;
      }
    };
    fetchServices();
  }, []);
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const serviceData = {
      service_name,
      service_description,
      service_price,
    };
    console.log("Data to be sent to the server ", serviceData);

    const addNewService = Services_services.addService(serviceData);
    console.log("The Created Service ::: ", addNewService);
    addNewService
      .then((response) => {
        console.log("The response from the server ::: ", response);
        if (!response.ok) {
          setServerError("Something went wrong while adding the service");
          return;
        } else {
          console.log("Service added successfully");
          response.json().then((data) => {
            console.log("The data from the server ::: ", data);
            setServices([...services, data.data]);
          });
        }
      })
      .catch((error) => {
        console.log("The error from the server ::: ", error);
        setServerError("Something went wrong while adding the service");
      });

    window.location.reload();
  };

  const handleDelete = async (service_id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) {
      return;
    }

    try {
      const response = await Services_services.deleteService(service_id);
      if (response.status === "true") {
        setSuccessOnDelete(response.message);
        console.log(response);
        // Refresh employee list after deletion
        window.location.reload();
      } else {
        setErrorOnDelete(response.message);
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      setErrorOnDelete("Something went wrong. Please try again later.");
    }
  };

  const handleToggleStatus = async (serviceId, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;

    try {
      const updatedService = await Services_services.updateServiceStatus(
        serviceId,
        newStatus
      );
      //  refresh list or update state
      if (updatedService) {
        setSuccessMessage("Service status updated successfully!");
        window.location.reload();
      } else {
        setServerError("Failed to update service status.");
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <>
      <div className="contact-section container">
        <div className="auto-container">
          <div className="contact-title ml-5">
            <h2>Services We Provide</h2>
            {successOnDelete && (
              <div className="alert alert-success" role="alert">
                {successOnDelete}
              </div>
            )}
            {errorOnDelete && (
              <div className="alert alert-danger" role="alert">
                {errorOnDelete}
              </div>
            )}
          </div>
          {services.length > 0 &&
            services.map((service) => (
              <div className="p-2 bg-white shadow-sm mb-1" key={service.id}>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="service-content p-3">
                    <h3 className="bold-text">{service.service_name}</h3>
                    <p>{service.service_description}</p>
                    <div className="d-flex align-items-center gap-2">
                      <span>{service.service_price} Birr</span>
                    </div>
                    <div>
                      <span
                        className={`status-badge ${
                          service.active_status === 1
                            ? "status-active"
                            : "status-inactive"
                        }`}
                        onClick={() =>
                          handleToggleStatus(
                            service.service_id,
                            service.active_status
                          )
                        }
                        style={{ cursor: "pointer" }}
                      >
                        {service.active_status === 1 ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center gap-3">
                    <Link to={`/admin/service/${service.service_id}`}>
                      <SquarePen color="red" />
                    </Link>
                    <button onClick={() => handleDelete(service.service_id)}>
                      <Trash2 color="#020712" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className=" container mt-4 justify-content-between shadow p-3 bg-white rounded position-relative">
          <Form onSubmit={handleFormSubmit}>
            <div className="row clearfix">
              <div className="form-column col-lg-10">
                <div className="inner-column">
                  <div className="contact-form">
                    <div className="row m-3">
                      <div className="contact-title mb-2 ml-5">
                        <h2>Add a new Service</h2>
                      </div>
                      <div className="form-group col-md-12 mx-3 mb-4">
                        <input
                          onChange={(event) =>
                            setService_name(event.target.value)
                          }
                          value={service_name}
                          type="text"
                          name="title"
                          placeholder="service name"
                          required
                        />
                      </div>
                      <div className="form-group col-md-12 mx-3 mb-4">
                        <input
                          onChange={(event) =>
                            setServicePrice(event.target.value)
                          }
                          value={service_price}
                          type="number"
                          step="0.01"
                          name="price"
                          placeholder="Service Price"
                          required
                        />
                      </div>
                      <div className="form-group col-md-12 mx-3 mb-4">
                        <textarea
                          onChange={(event) =>
                            setServiceDescription(event.target.value)
                          }
                          value={service_description}
                          type="text"
                          name="description"
                          placeholder="service description"
                          required
                        />
                      </div>

                      <button
                        className="theme-btn btn-style-one p-4 px-5"
                        type="submit"
                      >
                        <span>Add Service</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default AddService;
