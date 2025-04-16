import React, { useState } from "react";
import order_services from "../../services/order.service";

function TrackProgress() {
  const [hashKey, setHashKey] = useState("");
  const [orderedData, setorderedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hashKey.trim()) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await order_services.getCustomerAndVehicleInfo(hashKey);

      console.log("Response data on tracking ", response.data);
      if (!response.data) {
        setErrorMessage("No order found with this hash key");
        setorderedData(null);
      } else {
        setorderedData(response.data);
      }
    } catch (error) {
      setErrorMessage(error.message || "Failed to load order details");
      setorderedData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      1: "bg-secondary text-white p-3",
      2: "bg-warning text-dark p-3",
      3: "bg-success text-white p-3",
      4: "bg-danger text-white p-3",
    };
    return (
      <span
        className={`badge rounded-pill ${
          statusClasses[status] || "bg-secondary"
        }`}
      >
        {getStatusText(status)}
      </span>
    );
  };

  const getStatusText = (statusCode) => {
    const statusMap = {
      1: "Received",
      2: "In Progress",
      3: "Completed",
      4: "Delayed",
    };
    return statusMap[statusCode] || "Unknown Status";
  };

  return (
    <section className="progess-container">
      {!orderedData ? (
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form onSubmit={handleSubmit} className="card p-4 shadow">
                <h2 className="mb-4 text-center">Track Your Order</h2>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter your order hash key"
                    value={hashKey}
                    onChange={(e) => setHashKey(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-secondary btn-lg w-100"
                  disabled={isLoading}
                >
                  {isLoading ? "Searching..." : "Track Order"}
                </button>

                {errorMessage && (
                  <div className="alert alert-danger mt-3">{errorMessage}</div>
                )}
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="progress-cards container py-4">
          <div>
            <h1 className="mb-4">
              {orderedData.customer_first_name} {orderedData.customer_last_name}
            </h1>
            <p className="mb-4 lead">
              {orderedData.notes_for_customer ||
                "You can track the progress of your order using this page. We will constantly update this page to let you know how we are progressing."}
            </p>
          </div>

          <div className="d-flex gap-4 mb-4 ">
            <div className="customer-info">
              <div className="p-4 border rounded ">
                <h6>CUSTOMER</h6>
                <div className="d-flex flex-column gap-2">
                  <h3 className="mb-3">
                    {orderedData.customer_first_name}{" "}
                    {orderedData.customer_last_name}
                  </h3>
                  <div>
                    <strong>Email:</strong> {orderedData.customer_email}
                  </div>
                  <div>
                    <strong>Phone Number:</strong>{" "}
                    {orderedData.customer_phone_number}
                  </div>
                  <div>
                    <strong>Active Customer:</strong>{" "}
                    {orderedData.is_active_customer ? "Yes" : "No"}
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Information */}

            <div className="p-4 vehicle-info ">
              <h6>CAR IN SERVICE</h6>
              <div className="d-flex flex-column gap-2">
                <h3 className="mb-3">
                  {orderedData.vehicle_year} {orderedData.vehicle_make}{" "}
                  {orderedData.vehicle_model}
                </h3>
                <div>
                  <strong>Vehicle Tag:</strong> {orderedData.vehicle_tag}
                </div>
                <div>
                  <strong>Vehicle year:</strong> {orderedData.vehicle_year}
                </div>
                <div>
                  <strong>Vehicle Mileage:</strong>{" "}
                  {orderedData.vehicle_mileage} miles
                </div>
              </div>
            </div>
          </div>

          {/* Order Status information */}
          <div className="mb-4 p-4 border rounded ">
            <h3>Order Status</h3>
            <div className="d-flex align-items-center gap-3">
              <div>
                <p className="m-0">
                  Order Date:{" "}
                  {new Date(orderedData.order_date).toLocaleDateString()}
                </p>
                {orderedData.estimated_completion_date && (
                  <p className="m-0">
                    Estimated Completion:{" "}
                    {new Date(
                      orderedData.estimated_completion_date
                    ).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Requested Services Status  */}
          <div className="rounded p-4 progress-services border">
            <h3 className="mb-4">Services Progress</h3>
            <div className="d-flex flex-column gap-3">
              {orderedData.services?.map((service, index) => (
                <div key={index} className="p-3 border rounded">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <h5 className="m-0">{service.service_name}</h5>
                      <p className="m-0 text-muted">
                        {service.service_description}
                      </p>
                    </div>
                    <span
                      className={`badge rounded-pill ${
                        service.service_completed
                          ? "bg-success text-white"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {service.service_completed ? "Completed" : "In Progress"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {orderedData.additional_request && (
            <div className="mt-4 p-4 border rounded">
              <h4>Additional Requests</h4>
              <p>{orderedData.additional_request}</p>
              <p className="text-muted">
                Status:{" "}
                {orderedData.additional_requests_completed
                  ? "Completed"
                  : "Pending"}
              </p>
            </div>
          )}

          <div className="mt-4 text-center">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setorderedData(null)}
            >
              Check Another Order
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default TrackProgress;
