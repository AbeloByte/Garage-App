/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import getAuth from "../../../utils/auth";

const PrivateAuthRoute = ({ roles, children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAuthorized, setAuthorized] = useState(false);
  const [ischecked, setisChecked] = useState(false);

  useEffect(() => {
    const isLoggedIn = getAuth();

    console.log(isLoggedIn);

    isLoggedIn.then((response) => {
      if (response.employee_token) {
        setIsLogged(true);
        console.log("Employee Role ID : ", response.employee_role);
        console.log("Roles : ", roles);
        if (
          roles &&
          roles.length > 0 &&
          roles.includes(response.employee_role)
        ) {
          setAuthorized(true);
        }
        setisChecked(true);
      }
    });
  }, [roles]);

  if (ischecked) {
    if (!isLogged) {
      return <Navigate to="/login" />;
    }
    if (!isAuthorized) {
      return <Navigate to="/unauthorized" />;
    }
  }
  return children;
};

export default PrivateAuthRoute;
