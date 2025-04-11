/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

// import { Link } from "react-router-dom";
import { SquarePen, ExternalLink } from "lucide-react";
// import services
import CustomerList from "../../../../services/customer.service";
// import use auth
import { useAuth } from "../../../../context/AuthContext";

//  import table from react Bootstrap
import { Table, Button } from "react-bootstrap";
// import date formater
import { format } from "date-fns";

import { Link } from "react-router-dom";
function CustomersList() {
  const [customers, setCustomers] = useState([]);

  // errors
  const [error, setError] = useState("");
  const [serverError, setServerError] = useState("");
  const [apiErrorMsg, setapiErrorMsg] = useState("");

  //
  const { employee_data } = useAuth();
  let token = null;
  if (employee_data) {
    token = employee_data.employee_token;
  }

  useEffect(() => {
    const CustomerLists = CustomerList.getAllCustomers(token);

    console.log("List of Employees ", CustomerLists);
    CustomerLists.then((response) => {
      if (!response.ok) {
        serverError(true);
        if (response.status === 401) {
          setapiErrorMsg("Please Login Login Again");
        } else if (response.status === 403) {
          setapiErrorMsg("You are not authorized to view this page");
          {
            setapiErrorMsg("Something went wrong");
          }
        } else {
          setapiErrorMsg("Please try again later");
        }
      }
      return response.json();
    }).then((data) => {
      console.log(data);
      if (data?.data?.length !== 0) {
        setCustomers(data.data);
      }
    });
  }, []);

  const handleEdit = () => {
    console.log("Edit Clicked");
    // history.push("/admin/customers/edit");
  };

  console.log("Customer Data", customers);
  return (
    <>
      {apiErrorMsg ? (
        <>
          <section className="contact-section">
            <div className="auto-container">
              <div className="contact-title">{apiErrorMsg}</div>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="contact-section">
            <div className="auto-container">
              <div>
                <div className="contact-title">
                  <h1>Customers </h1>
                </div>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Active</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Added Date</th>
                      <th>Edit/Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers &&
                      customers.map((customer, index) => (
                        <tr key={customer.customer_id}>
                          <td>
                            {customer.active_customer_status ? "Yes" : "No"}
                          </td>
                          <td>{customer.customer_first_name}</td>
                          <td>{customer.customer_last_name}</td>
                          <td>{customer.customer_email}</td>
                          <td>{customer.customer_phone_number}</td>
                          <td>
                            {/* {format(new Date(customer), "MM - dd - yyyy")} */}
                            --
                          </td>
                          <td>
                            <div className="edit-delete-icons">
                              <Link
                                to={`/admin/customer/${customer.customer_id}`}
                              >
                                <SquarePen
                                  onClick={handleEdit}
                                  className="hover-effect space"
                                />
                              </Link>

                              <Link
                                to={`/admin/customer/${customer.customer_id}/vehicles`}
                              >
                                <ExternalLink className="hover-effect space" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </section>
        </>
      )}{" "}
    </>
  );
}

export default CustomersList;
