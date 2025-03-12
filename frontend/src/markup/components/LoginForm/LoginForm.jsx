/* eslint-disable no-unused-vars */
import React, { useState } from "react";
// import useNavigate
import { useNavigate } from "react-router-dom";
// import Login Service
import loginservice from "../../../services/login.service";

function LoginForm() {
  // useNavigate to navigate to the home page
  const navigate = useNavigate();
  // useState for the Email and passwors
  const [employee_email, setEmail] = useState("");
  const [employee_password, setPassword] = useState("");

  // Error alerting useState for email and password
  const [emailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");

  //
  const handleLogin = (e) => {
    e.preventDefault();

    let flag = true;

    // check the email correctness
    if (employee_email === "") {
      setEmailError("Email is required");
      flag = false;
    } else if (!employee_email.includes("@")) {
      setEmailError("Invalid Email , Please Try to insert the correct Email");
    } else {
      const regx = /^\S+@\S\S+\.\S+$/;
      if (!regx.test(employee_email)) {
        setEmailError("invalid email format");
        flag = false;
      }
    }

    // for the password correctness
    if (employee_password === "") {
      setPasswordError("Password is required");
      flag = false;
    } else if (employee_password.length < 8) {
      setPasswordError("Password must be 8 characters long");
      flag = false;
    } else {
      setPasswordError("");
    }

    if (!flag) {
      return;
    }

    const formData = {
      employee_email,
      employee_password,
    };

    const loginFormData = loginservice.LoginForm(formData);

    console.log("Data that is the login form ", loginFormData);

    loginFormData
      .then((response) => response.json())
      .then((response) => {
        console.log("Response from the login form ", response);
        if (response.status === "success") {
          // check if store the token in the local storage
          // console.log(response.data.employee_token);

          if (response.data.employee_token) {
            console.log(response.data);
            localStorage.setItem("employee", JSON.stringify(response.data));
          }
          // navigate("/admin");
          if (location.pathname === "/login") {
            navigate("/admin");
            window.location.replace("/admin");
            // To home for now
            window.location.replace("/");
          } else {
            window.location.reload();
          }
        } else {
          setServerError(response.message);
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
            <h2>Login to your account</h2>
          </div>
          <div className="row clearfix">
            <div className="form-column col-lg-7">
              <div className="inner-column">
                <div className="contact-form">
                  <form onSubmit={handleLogin}>
                    <div className="row clearfix">
                      <div className="form-group col-md-12">
                        {serverError && (
                          <div className="validation-error">
                            {setServerError}
                          </div>
                        )}
                        <input
                          type="email"
                          name="employee_email"
                          placeholder="Email"
                          value={employee_email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && (
                          <div className="validation-error">{emailError}</div>
                        )}
                      </div>
                      <div className="form-group col-md-12">
                        <input
                          type="password"
                          name="employee_password"
                          placeholder="Password"
                          value={employee_password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {PasswordError && (
                          <div className="validation-error">
                            {PasswordError}
                          </div>
                        )}
                      </div>
                      <div className="form-group col-md-12">
                        <button
                          className="theme-btn btn-style-one"
                          type="submit"
                          data-loading-text="Please wait..."
                        >
                          <span>Login</span>
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

export default LoginForm;
