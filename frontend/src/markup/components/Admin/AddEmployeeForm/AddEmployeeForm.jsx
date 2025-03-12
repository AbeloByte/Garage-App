/* eslint-disable no-unused-vars */
// import useState
import React, { use, useState } from "react";
// import employeeService
import employeeService from "../../../../services/employee.service";
import { useAuth } from "../../../../context/AuthContext.jsx";
function AddEmployeeForm() {
  // create a state variable for the each form data
  const [employee_email, setEmployeeEmail] = useState("");
  const [employee_first_name, setEmployeeFirstName] = useState("");
  const [employee_last_name, setEmployeeLastName] = useState("");
  const [employee_phone, setEmployeePhone] = useState("");
  const [employee_password, setEmployeePassword] = useState("");
  const [active_employee, setactive_employee] = useState(1);
  const [company_role_id, setCompanyRole] = useState(1);

  // useState to show the Error
  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setfirstNameRequired] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");

  // import token from useAuth

  let loggedinEmployeeToken = "";
  // get the logged in employee token from the local storage
  const { employee_data } = useAuth();
  if (employee_data && employee_data.employee_token) {
    loggedinEmployeeToken = employee_data.employee_token;
  }

  // console.log(loggedinEmployeeToken);
  // function to handle the form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    let flag = true;

    // for the first name
    if (!employee_first_name) {
      setfirstNameRequired("First name is required");
      flag = false;
    } else {
      setfirstNameRequired("");
    }

    // for the email

    if (employee_email === "") {
      setEmailError("Email is required");
      flag = false;
    } else if (!employee_email.includes("@")) {
      setEmailError("Email is invalid");
    } else {
      const regx = /^\S+@\S\S+\.\S+$/;
      if (!regx.test(employee_email)) {
        setEmailError("invalid email format");
        flag = false;
      }
    }

    // for the password
    if (employee_password === "") {
      setpasswordError("Password is required");
      flag = false;
    } else if (employee_password.length < 8) {
      setpasswordError("Password must be 8 characters long");
      flag = false;
    } else {
      setpasswordError("");
    }

    if (!flag) {
      return;
    }

    // create a new employee object
    const newEmployeeformData = {
      employee_email,
      employee_first_name,
      employee_last_name,
      employee_phone,
      employee_password,
      active_employee,
      company_role_id,
    };
    // call the addEmployee function from the employeeService
    const createEmployee = employeeService.addEmployee(
      newEmployeeformData,
      loggedinEmployeeToken
    );
    console.log("ACCOUNT CREATED SUCCEESSFULLY  :--  ", createEmployee);

    createEmployee
      .then((data) => {
        console.log(data);
        if (data.error) {
          setServerError(data.error);
        } else {
          setSuccess(true);
          setServerError("");
          // timeout to redirect to the employee page
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        }
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setServerError(resMessage);
      });
  };

  return (
    <>
      <section className="contact-section">
        <div className="auto-container">
          <div className="contact-title">
            <h2>Add a new employee</h2>
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
                            setEmployeeEmail(event.target.value)
                          }
                          value={employee_email}
                          type="email"
                          name="employee_email"
                          placeholder="Employee email"
                        />
                        {emailError && (
                          <div className="text-danger">{emailError}</div>
                        )}
                      </div>
                      <div className="form-group col-md-12">
                        <input
                          onChange={(event) =>
                            setEmployeeFirstName(event.target.value)
                          }
                          value={employee_first_name}
                          type="text"
                          name="employee_first_name"
                          placeholder="Employee first name"
                        />
                        {firstNameRequired && (
                          <div className="text-danger">{firstNameRequired}</div>
                        )}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          onChange={(event) =>
                            setEmployeeLastName(event.target.value)
                          }
                          value={employee_last_name}
                          type="text"
                          name="employee_last_name"
                          placeholder="Employee last name"
                          required
                        />
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          onChange={(event) =>
                            setEmployeePhone(event.target.value)
                          }
                          value={employee_phone}
                          type="text"
                          name="employee_phone"
                          placeholder="Employee phone (555-555-5555)"
                          required
                        />
                      </div>

                      <div className="form-group col-md-12">
                        <select
                          name="employee_role"
                          className="custom-select-box"
                          value={company_role_id}
                          onChange={(event) =>
                            setCompanyRole(event.target.value)
                          }
                        >
                          <option value="1">Employee</option>
                          <option value="2">Manager</option>
                          <option value="3">Admin</option>
                        </select>
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          onChange={(event) =>
                            setEmployeePassword(event.target.value)
                          }
                          value={employee_password}
                          type="password"
                          name="employee_password"
                          placeholder="Employee password"
                        />
                        {passwordError && (
                          <div className="text-danger">{passwordError}</div>
                        )}
                      </div>

                      <div className="form-group col-md-12">
                        <button
                          className="theme-btn btn-style-one"
                          type="submit"
                          data-loading-text="Please wait..."
                        >
                          <span>Add employee</span>
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
  );
}

export default AddEmployeeForm;
