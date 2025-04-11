import React from "react";

import EditCustomer from "../../components/Admin/EditCustomer/EditCustomer";
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
            <EditCustomer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Customers;
