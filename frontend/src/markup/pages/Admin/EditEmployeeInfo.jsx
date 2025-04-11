import React from "react";
import AddMenu from "../../components/Admin/AddMenu/AddMenu";
import EditEmployee from "../../components/Admin/EditEmployee/EditEmployee";
function EditEmployeeInfo() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AddMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <EditEmployee />
          </div>
        </div>
      </div>
    </>
  );
}

export default EditEmployeeInfo;
