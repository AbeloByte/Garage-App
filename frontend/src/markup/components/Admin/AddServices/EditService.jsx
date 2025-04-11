import React, { useState, useEffect } from "react";
import Services_services from "../../../../services/service.service";
import { Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

function EditService() {
  const requested_parm_id = useParams();
  const service_id = requested_parm_id.id;

  const navigate = useNavigate();

  const [service_name, setService_name] = useState("");
  const [service_description, setServiceDescription] = useState("");
  const [service_price, setServicePrice] = useState("");
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // State to store original service data
  const [originalService, setOriginalService] = useState([]);

  useEffect(() => {
    // Fetch the service details by ID
    const fetchService = async () => {
      try {
        const response = await Services_services.getServiceById(service_id);

        if (response) {
          setOriginalService(response.data);
        }
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };
    fetchService();
  }, [service_id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updatedServiceData = {
      service_name,
      service_description,
      service_price,
    };

    console.log("The Collected Object is", updatedServiceData);
    try {
      const response = await Services_services.editServiceInfo(
        service_id,
        updatedServiceData
      );

      console.log("Response from server:", response);
      if (response) {
        setSuccessMessage("Service updated successfully!");
        setServerError(""); // Clear any previous error messages
        console.log("Service updated successfully:", response.data);
        navigate("/admin/services"); // Redirect to the services list page
      } else {
        setServerError("Failed to update the service.");
      }
    } catch (error) {
      console.error("Error updating service:", error);
      setServerError("Something went wrong while updating the service.");
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 rounded-4 p-4">
        <h2 className="text-center mb-4">Edit Service</h2>

        {/* Error and success message */}
        {serverError && <div className="alert alert-danger">{serverError}</div>}
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}

        {/* Display original service information */}
        {originalService && (
          <div className="mb-4 p-3 border rounded-3 bg-secondary">
            <h5 className="fw-bold">Previous Service Information</h5>
            <div className="d-flex justify-content-between">
              <p>
                <strong>Name:</strong> {originalService.service_name}
              </p>
              <p>
                <strong>Price:</strong> {originalService.service_price} Birr
              </p>
            </div>
            <div className="d-flex justify-content-between">
              <p>
                <strong>Status:</strong>{" "}
                {originalService.active_status === 1 ? "Active" : "Inactive"}
              </p>
            </div>
            <p>
              <strong>Description:</strong>{" "}
              {originalService.service_description}
            </p>
          </div>
        )}

        <Form onSubmit={handleFormSubmit}>
          <div className="form-floating mb-3">
            <label htmlFor="serviceName">Service Name</label>
            <input
              type="text"
              className="form-control"
              id="serviceName"
              value={service_name}
              onChange={(e) => setService_name(e.target.value)}
              required
            />
          </div>
          <div className="form-floating mb-3">
            <label htmlFor="serviceDescription">Service Description</label>
            <textarea
              className="form-control"
              id="serviceDescription"
              value={service_description}
              onChange={(e) => setServiceDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-floating mb-3">
            <label htmlFor="servicePrice">Service Price (Birr)</label>
            <input
              type="number"
              className="form-control"
              id="servicePrice"
              value={service_price}
              onChange={(e) => setServicePrice(e.target.value)}
              step="0.01"
              required
            />
          </div>

          <button type="submit" className="theme-btn btn-style-one">
            <i className="bi bi-check-lg me-2"></i> Update Service
          </button>
        </Form>
      </div>
    </div>
  );
}

export default EditService;
