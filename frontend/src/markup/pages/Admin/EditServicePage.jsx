import React from "react";
import AddMenu from "../../components/Admin/AddMenu/AddMenu";
import EditService from "../../components/Admin/AddServices/EditService";

function EditServicePage() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AddMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <EditService />
          </div>
        </div>
      </div>
    </>
  );
}

export default EditServicePage;
