/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

import employeeServices from "../../../../services/employee.service";
//  import table from react Bootstrap
import { Table, Button } from "react-bootstrap";

import { useAuth } from "../../../../context/AuthContext";

// import EmployeeServices
import { Link } from "react-router-dom";

import { SquarePen, Trash2 } from "lucide-react";
// import date formater
import { format } from "date-fns";
function EmployeeList() {
  const [employeeList, setEmployeeList] = useState([]);
  const [apiError, setapiError] = useState("");
  const [apiErrorMsg, setapiErrorMsg] = useState(null);

  const [successOnDelete, setSuccessOnDelete] = useState(false);
  const [errorOnDelete, setErrorOnDelete] = useState(false);
  const { employee_data } = useAuth();

  let token = null;
  if (employee_data) {
    token = employee_data.employee_token;
  }

  useEffect(() => {
    const EmployeeList = employeeServices.getAllEmployee(token);
    console.log("List of Employees ", EmployeeList);
    EmployeeList.then((response) => {
      if (!response.ok) {
        setapiError(true);
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
        setEmployeeList(data.data);
      }
    });
  }, []);

  const handleDelete = async (employeeId) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      const response = await employeeServices.deleteEmployee(employeeId);
      if (response.status === "true") {
        setSuccessOnDelete(response.message);
        console.log(response);
        employeeServices.getAllEmployee();
        // Refresh employee list after deletion
        window.location.reload();
      } else {
        setErrorOnDelete(response.message);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      setErrorOnDelete("Something went wrong. Please try again later.");
    }
  };

  // console.log(employeeList);

  return (
    <>
      {apiError ? (
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
                  <h1>Employees </h1>

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
                    {employeeList &&
                      employeeList.map((employee, index) => (
                        <tr key={employee.employee_id}>
                          <td>{employee.active_employee ? "Yes" : "No"}</td>
                          <td>{employee.employee_first_name}</td>
                          <td>{employee.employee_last_name}</td>
                          <td>{employee.employee_email}</td>
                          <td>{employee.employee_phone}</td>
                          <td>
                            {format(
                              new Date(employee.added_date),
                              "MM - dd - yyyy"
                            )}
                          </td>
                          <td>{employee.company_role_name}</td>
                          <td>
                            <div className="edit-delete-icons">
                              <Link
                                to={`/admin/employee/${employee.employee_id}`}
                              >
                                <SquarePen />
                              </Link>
                              <button
                                onClick={() =>
                                  handleDelete(employee.employee_id)
                                }
                              >
                                <Trash2 />
                              </button>
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

export default EmployeeList;
