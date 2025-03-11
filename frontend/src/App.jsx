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
import "./assets/styles/custome.css";
import Header from "./markup/components/Header/Header";
import Footer from "./markup/components/Footer/Footer";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/add-employee" element={<AddEmployee />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
