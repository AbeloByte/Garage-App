import React from "react";
import AddMenu from "../../components/Admin/AddMenu/AddMenu";
import AddService from "../../components/Admin/AddServices/AddService";

function ServicePage() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AddMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <AddService />
          </div>
        </div>
      </div>
    </>
  );
}

export default ServicePage;
