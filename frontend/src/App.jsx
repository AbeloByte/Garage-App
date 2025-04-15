import "./App.css";
// import react router
import { Routes, Route } from "react-router-dom";
// import pages
import Home from "./markup/pages/Home";
import Login from "./markup/pages/Login";
import AddEmployee from "./markup/pages/Admin/AddEmployee";

// import css files
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/color.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "leaflet/dist/leaflet.css";

// import custome css file
import "./assets/styles/custome.css";
import Header from "./markup/components/Header/Header";
import Footer from "./markup/components/Footer/Footer";
import UnAuthorized from "./markup/pages/UnAuthorized";
import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRoute";
import ViewAllCustomers from "./markup/pages/Admin/ViewAllCustomers";
// pages

import Dashboard from "./markup/pages/Admin/Dashboard";

import Customers from "./markup/pages/Admin/Customers";
import Orders from "./markup/pages/Admin/Orders";
import Employees from "./markup/pages/Admin/Employees";

import EditCustomer from "./markup/pages/Admin/EditCustomer";
import EditEmployee from "./markup/pages/Admin/EditEmployeeInfo";
import CustomerProfilePage from "./markup/pages/Admin/CustomerProfilePage";
import ServicePage from "./markup/pages/Admin/ServicePage";
import OrderPage from "./markup/pages/Admin/OrdersPage";
import EditServicePage from "./markup/pages/Admin/EditServicePage";
import About from "./markup/pages/About";
import Services from "./markup/pages/Services";
import Contact from "./markup/pages/Contact";
import TrackProgess from "./markup/pages/TrackProgess";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<UnAuthorized />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/track-progress" element={<TrackProgess />} />

        <Route
          path="/admin/add-customers"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Customers />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Dashboard />
            </PrivateAuthRoute>
          }
        />

        <Route
          path="/admin/all-customers"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <ViewAllCustomers />
            </PrivateAuthRoute>
          }
        />

        {/* <Route path="/admin/orders" element={<Orders />} /> */}
        <Route path="/admin/employees" element={<Employees />} />
        <Route
          path="/admin/add-employee"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddEmployee />
            </PrivateAuthRoute>
          }
        />

        {/* edit Customer  */}
        <Route
          path="/admin/customer/:customerId"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <EditCustomer />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/employee/:employeeId"
          element={
            <PrivateAuthRoute roles={[3]}>
              <EditEmployee />
            </PrivateAuthRoute>
          }
        ></Route>
        <Route
          path="/admin/customer/:customerId/vehicles/"
          element={
            <PrivateAuthRoute roles={[3]}>
              <CustomerProfilePage />
            </PrivateAuthRoute>
          }
        ></Route>
        {/* Add service */}
        <Route
          path="/admin/services"
          element={
            <PrivateAuthRoute roles={[3]}>
              <ServicePage />
            </PrivateAuthRoute>
          }
        ></Route>
        {/* Add Order */}
        <Route
          path="/admin/new-order"
          element={
            <PrivateAuthRoute roles={[3]}>
              <Orders />
            </PrivateAuthRoute>
          }
        ></Route>
        {/* See Orders */}
        <Route
          path="/admin/orders"
          element={
            <PrivateAuthRoute roles={[3]}>
              <OrderPage />
            </PrivateAuthRoute>
          }
        ></Route>
        <Route
          path="/admin/service/:id"
          element={
            <PrivateAuthRoute roles={[3]}>
              <EditServicePage />
            </PrivateAuthRoute>
          }
        ></Route>
      </Routes>
      {/* edit Employee Information  */}

      <Footer />
    </>
  );
}

export default App;
