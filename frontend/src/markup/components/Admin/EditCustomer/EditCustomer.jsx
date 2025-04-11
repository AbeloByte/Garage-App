import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import customerService from "../../../../services/customer.service";
import { CloudSnow } from "lucide-react";

function EditCustomer() {
  const { customerId } = useParams(); // Get customerId from URL
  console.log("This is customer ID from the URL ::", customerId);

  const [customer_email, setCustomerEmail] = useState("");
  const [customer_old_first_name, fetchCustomerFirstName] = useState("");
  const [customer_first_name, setCustomerFirstName] = useState("");
  const [customer_old_last_name, fetchCustomerLastName] = useState("");
  const [customer_last_name, setCustomerLastName] = useState("");
  const [customer_phone_number, setCustomerPhone] = useState("");
  const [active_customer_status, setActiveCustomerStatus] = useState(1);

  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch customer details on page load
  useEffect(() => {
    if (!customerId) return; // Prevent unnecessary API call if ID is missing

    const fetchCustomer = async () => {
      try {
        const response = await customerService.getCustomerbyID(customerId);
        console.log("This is the response from the API ::", response);
        console.log("The Data From repsonse :: ", response.data.customer_email);
        if (response.data) {
          setCustomerEmail(response.data[0].customer_email);
          fetchCustomerFirstName(response.data[0].customer_first_name);
          fetchCustomerLastName(response.data[0].customer_last_name);
        }
      } catch (error) {
        setServerError("Failed to fetch customer details. Please try again.");
        console.log(error);
      }
    };

    fetchCustomer();
  }, [customerId]); // Runs every time `customerId` changes

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setSuccess("");
    setServerError("");

    const updatedCustomer = {
      customer_email,
      customer_first_name,
      customer_last_name,
      customer_phone_number,
      active_customer_status,
    };

    try {
      const response = await customerService.editCustomerInfo(
        customerId,
        updatedCustomer
      );

      console.log("This is the response from the API ::", response);
      console.log(response.message);
      if (response.message) {
        setSuccess(response.message);
      }
    } catch (error) {
      setServerError("Error updating customer. Please try again.", error);
      // setServerError();
    }
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>
            Edit: {customer_old_first_name + " " + customer_old_last_name}
          </h2>
          <h4 className="text-bold">Customer email: {customer_email}</h4>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleFormSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      {success && (
                        <div className="alert alert-success">{success}</div>
                      )}
                      {serverError && (
                        <div className="alert alert-danger">{serverError}</div>
                      )}
                      <input
                        onChange={(event) =>
                          setCustomerFirstName(event.target.value)
                        }
                        value={customer_first_name}
                        type="text"
                        name="customer_first_name"
                        placeholder="Customer First Name"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        onChange={(event) =>
                          setCustomerLastName(event.target.value)
                        }
                        value={customer_last_name}
                        type="text"
                        name="customer_last_name"
                        placeholder="Customer Last Name"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        onChange={(event) =>
                          setCustomerPhone(event.target.value)
                        }
                        value={customer_phone_number}
                        type="text"
                        name="customer_phone"
                        placeholder="Customer Phone (555-555-5555)"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12 d-flex align-items-center gap-3">
                      <input
                        type="checkbox"
                        name="active_customer_status"
                        checked={active_customer_status === 1}
                        onChange={(event) =>
                          setActiveCustomerStatus(event.target.checked ? 1 : 0)
                        }
                      />
                      <label htmlFor="active_customer_status">
                        <strong> Is Active Customer </strong>
                      </label>
                    </div>

                    <div className="form-group col-md-12">
                      <button className="theme-btn btn-style-one" type="submit">
                        <span>Update</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditCustomer;
