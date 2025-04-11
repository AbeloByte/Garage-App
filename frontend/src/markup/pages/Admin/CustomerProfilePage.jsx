import React from "react";

import CustomerProfile from "../../components/Admin/CustomerProfile/CustomerProfile";
import AddMenu from "../../components/Admin/AddMenu/AddMenu";
function CustomerProfilePage() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AddMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <CustomerProfile />
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerProfilePage;
