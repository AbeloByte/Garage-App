import React from "react";
import AddCustomer from "../../components/Admin/AddCustomer/AddCustomer";
import AddMenu from "../../components/Admin/AddMenu/AddMenu";
function Customers() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AddMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <AddCustomer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Customers;
