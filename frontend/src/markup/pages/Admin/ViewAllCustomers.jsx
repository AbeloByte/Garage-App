import React from "react";

import CustomersList from "../../components/Admin/CustomersList/CustomersList";
import AddMenu from "../../components/Admin/AddMenu/AddMenu";
function ViewAllCustomers() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AddMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <CustomersList />
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewAllCustomers;
