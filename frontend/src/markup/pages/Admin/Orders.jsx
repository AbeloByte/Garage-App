import React from "react";
import AddOrder from "../../components/Admin/AddOrder/AddOrder";
import AddMenu from "../../components/Admin/AddMenu/AddMenu";

function Orders() {
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
            <AddOrder />
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;
