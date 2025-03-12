import React from "react";

import { useAuth } from "../../../context/AuthContext";
import LoginForm from "../../components/LoginForm/LoginForm";

// import AdminMenu
import AddMenu from "../../components/Admin/AddMenu/AddMenu";

// import employeeList
import EmployeeList from "../../components/Admin/EmployeeList/EmployeeList";
function Employees() {
  const { isLogged, isAdmin } = useAuth();
  if (isLogged) {
    if (isAdmin) {
      return (
        <>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side">
                <AddMenu />
              </div>
              <div className="col-md-9 admin-right-side">
                {/* <h1>Employee Page is Here</h1>
                 */}
                <EmployeeList />
              </div>
            </div>
          </div>
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
