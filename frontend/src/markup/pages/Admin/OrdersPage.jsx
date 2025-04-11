import React from "react";
import AddMenu from "../../components/Admin/AddMenu/AddMenu";
import Orders from "../../components/Orders/Orders";
function OrdersPage() {
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
            <Orders />
          </div>
        </div>
      </div>
    </>
  );
}

export default OrdersPage;
