import React from "react";
import AddMenu from "../../components/Admin/AddMenu/AddMenu";
import AdminDashboard from "../../components/Admin/Admin-Dashboard/AdminDashboard";
function Dashboard() {
  return (
    <>
      <div className="container-fluid admin-pages admin-dashboard">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AddMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <AdminDashboard />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
