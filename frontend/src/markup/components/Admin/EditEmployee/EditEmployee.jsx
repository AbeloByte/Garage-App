import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import employeeService from "../../../../services/employee.service";
function EditEmployee() {
  const { employeeId } = useParams(); // Get employeeId from URL
  console.log("This is employee ID from the URL ::", employeeId);

  const [employee_email, setemployeeEmail] = useState("");
  const [employee_old_first_name, fetchemployeeFirstName] = useState("");
  const [employee_first_name, setemployeeFirstName] = useState("");
  const [employee_old_last_name, fetchemployeeLastName] = useState("");
  const [employee_last_name, setemployeeLastName] = useState("");
  const [employee_phone, setemployeePhone] = useState("");
  const [company_role_id, setCompanyRole] = useState(1);
  const [active_employee, setActiveemployeeStatus] = useState(1);

  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch employee details on page load
  useEffect(() => {
    if (!employeeId) return; // Prevent unnecessary API call if ID is missing

    console.log("This is employee ID from the URL ::", employeeId);

    const fetchemployee = async () => {
      try {
        const response = await employeeService.getemployeebyID(employeeId);
        console.log("This is the response from the API ::", response);
        console.log(
          "The Data From repsonse :: ",
          response.data[0].employee_email
        );
        if (response.data) {
          setemployeeEmail(response.data[0].employee_email);
          fetchemployeeFirstName(response.data[0].employee_first_name);
          fetchemployeeLastName(response.data[0].employee_last_name);
        }
      } catch (error) {
        setServerError("Failed to fetch employee details. Please try again.");
        console.log(error);
      }
    };

    fetchemployee();
  }, [employeeId]); // Runs every time `employeeId` changes

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setSuccess("");
    setServerError("");

    const updatedemployee = {
      employee_email,
      employee_first_name,
      employee_last_name,
      employee_phone,
      active_employee,
      company_role_id,
    };

    try {
      const response = await employeeService.editemployeeInfo(
        employeeId,
        updatedemployee
      );

      console.log("This is the response from the API ::", response);
      console.log(response.message);
      if (response.message) {
        setSuccess(response.message);
      }
    } catch (error) {
      setServerError("Error updating employee. Please try again.", error);
      // setServerError();
    }
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>
            Edit: {employee_old_first_name + " " + employee_old_last_name}
          </h2>
          <h4 className="text-bold">employee email: {employee_email}</h4>
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
                          setemployeeFirstName(event.target.value)
                        }
                        value={employee_first_name}
                        type="text"
                        name="employee_first_name"
                        placeholder="employee First Name"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        onChange={(event) =>
                          setemployeeLastName(event.target.value)
                        }
                        value={employee_last_name}
                        type="text"
                        name="employee_last_name"
                        placeholder="employee Last Name"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        onChange={(event) =>
                          setemployeePhone(event.target.value)
                        }
                        value={employee_phone}
                        type="text"
                        name="employee_phone"
                        placeholder="employee Phone (555-555-5555)"
                        required
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <select
                        name="employee_role"
                        className="custom-select-box"
                        value={company_role_id}
                        onChange={(event) => setCompanyRole(event.target.value)}
                      >
                        <option value="1">Employee</option>
                        <option value="2">Manager</option>
                        <option value="3">Admin</option>
                      </select>
                    </div>
                    <div className="form-group col-md-12 d-flex align-items-center gap-3">
                      <input
                        type="checkbox"
                        name="active_employee_status"
                        checked={active_employee === 1}
                        onChange={(event) =>
                          setActiveemployeeStatus(event.target.checked ? 1 : 0)
                        }
                      />
                      <label htmlFor="active_employee_status">
                        <strong> Is Active employee </strong>
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
export default EditEmployee;
