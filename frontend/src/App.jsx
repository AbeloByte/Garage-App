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

// import custome css file
import "./assets/styles/custom.css";
import Header from "./markup/components/Header/Header";
import Footer from "./markup/components/Footer/Footer";
import UnAuthorized from "./markup/pages/UnAuthorized";
import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRoute";

// pages

import Customers from "./markup/pages/Admin/Customers";
import Orders from "./markup/pages/Admin/Orders";
import Employees from "./markup/pages/Admin/Employees";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<UnAuthorized />} />

        <Route
          path="/admin/customers"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Customers />
            </PrivateAuthRoute>
          }
        />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/employees" element={<Employees />} />
        <Route
          path="/admin/add-employee"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddEmployee />
            </PrivateAuthRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
