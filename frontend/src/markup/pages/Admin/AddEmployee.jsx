import React from "react";
import AddEmployeeForm from "../../components/Admin/AddEmployeeForm/AddEmployeeForm";
import AddMenu from "../../components/Admin/AddMenu/AddMenu";

function AddEmployee() {
  return (
    <>
      <div className="container-fluid admin-pages">
      <div className="row">
      <div className="col-md-3 admin-left-side">
        <AddMenu />
      </div>
      <div className="col-md-9 admin-right-side">
        <AddEmployeeForm />
      </div>
      </div>
      </div>
    </>
  );
}
export default AddEmployee;
