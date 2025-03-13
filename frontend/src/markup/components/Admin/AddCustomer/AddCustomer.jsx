/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import AdminMenu from "../AddMenu/AddMenu";
import customerService from "../../../../services/customer.service";
function AddCustomer() {
  const [customer_email, setCustomerEmail] = useState("");
  const [customer_first_name, setCustomerFirstName] = useState("");
  const [customer_last_name, setCustomerLastName] = useState("");
  const [customer_phone_number, setCustomerPhone] = useState("");
  const [active_customer_status, setactive_customer_status] = useState(1);

  // errors
  const [serverError, setServerError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setfirstNameRequired] = useState("");
  const [success, setSuccess] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let customerflag = true;

    if (!customer_first_name) {
      setfirstNameRequired("First name is required");
      customerflag = false;
    } else {
      setfirstNameRequired("");
    }
    if (!customer_email) {
      setEmailError("Email is required");
      customerflag = false;
    } else if (!customer_email.includes("@")) {
      setEmailError("Email is invalid");
      const regex = /^\S+@\S\S+\.\S+$/;
      if (!regex.test(customer_email)) {
        setEmailError("Invalid email format");
        customerflag = false;
      }
    }

    if (!customerflag) {
      return;
    }

    // collect all the input data
    const CustomerFormData = {
      customer_email,
      customer_first_name,
      customer_last_name,
      customer_phone_number,
      active_customer_status,
    };

    console.log("The Collected Customer Data ::: ", CustomerFormData);

    // call the add customer servuce
    const createCustomer = customerService.addCustomer(CustomerFormData);
    console.log("The Created Customer ::: ", createCustomer);

    createCustomer
      .then((response) => response.json()) // Parse the response to JSON
      .then((data) => {
        if (data.status === "false") {
          setServerError(data.message);
        } else {
          setSuccess(data.message);
          setServerError("");
          // setTimeout(() => {
          //   window.location.href = "/";
          // }, 2000);
        }
      });
  };
  return (
    <>
      <>
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>Add a new customer</h2>
              {success && (
                <div className="text-success">
                  <h1>{success}</h1>{" "}
                </div>
              )}
            </div>
            <div className="row clearfix">
              <div className="form-column col-lg-7">
                <div className="inner-column">
                  <div className="contact-form">
                    <form onSubmit={handleFormSubmit}>
                      <div className="row clearfix">
                        <div className="form-group col-md-12">
                          {serverError && <div className="">{serverError}</div>}
                          <input
                            onChange={(event) =>
                              setCustomerEmail(event.target.value)
                            }
                            value={customer_email}
                            type="email"
                            name="customer_email"
                            placeholder="customer email"
                          />
                          {emailError && (
                            <div className="text-danger">{emailError}</div>
                          )}
                        </div>
                        <div className="form-group col-md-12">
                          <input
                            onChange={(event) =>
                              setCustomerFirstName(event.target.value)
                            }
                            value={customer_first_name}
                            type="text"
                            name="customer_first_name"
                            placeholder="customer first name"
                          />
                          {firstNameRequired && (
                            <div className="text-danger">
                              {firstNameRequired}
                            </div>
                          )}
                        </div>

                        <div className="form-group col-md-12">
                          <input
                            onChange={(event) =>
                              setCustomerLastName(event.target.value)
                            }
                            value={customer_last_name}
                            type="text"
                            name="customer_last_name"
                            placeholder="customer last name"
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
                            placeholder="customer phone (555-555-5555)"
                            required
                          />
                        </div>

                        <div className="form-group col-md-12">
                          <button
                            className="theme-btn btn-style-one"
                            type="submit"
                            data-loading-text="Please wait..."
                          >
                            <span>Add customer</span>
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
      </>
    </>
  );
}

export default AddCustomer;
