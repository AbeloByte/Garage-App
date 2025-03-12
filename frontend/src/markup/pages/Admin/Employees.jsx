import React from "react";

import { useAuth } from "../../../context/AuthContext";
import LoginForm from "../../components/LoginForm/LoginForm";

function Employees() {
  const { isLogged, isAdmin } = useAuth();
  if (isLogged) {
    if (isAdmin) {
      return (
        <>
          <h1>Employee Page is Here</h1>
        </>
      );
    } else {
      return (
        <>
          <h1>You Are Not Authorized</h1>
        </>
      );
    }
  } else {
    return (
      <>
        <LoginForm />
      </>
    );
  }
}

export default Employees;
