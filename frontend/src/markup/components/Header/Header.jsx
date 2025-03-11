import React from "react";
import logo from "../../../assets/images/logo.png";

// import link from react-router-dom
import { Link } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";

import loginservice from "../../../services/login.service";
function Header() {
  // console.log(useAuth());
  // destructure the useAuth
  const { isLogged, employee_data, setIsLogged } = useAuth();

  //  destructure the loginService

  const logOut = () => {
    loginservice.logOut();
    setIsLogged(false);
    window.location.href = "/login";
  };
  return (
    <>
      <header className="main-header header-style-one">
        <div className="header-top">
          <div className="auto-container">
            <div className="inner-container">
              <div className="left-column">
                <div className="text">Enjoy the በሶ while we fix your car</div>
                <div className="office-hour">
                  Monday - Saturday 7:00AM - 6:00PM
                </div>
              </div>
              {isLogged ? (
                <div className="right-column">
                  <div className="phone-number">
                    <strong>
                      Welcome {employee_data?.employee_first_name}
                      {"   "}
                    </strong>
                  </div>
                </div>
              ) : (
                <div className="right-column">
                  <div className="phone-number">
                    Schedule Your Appontment Today :{" "}
                    <strong>1800 456 7890</strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="header-upper">
          <div className="auto-container">
            <div className="inner-container">
              <div className="logo-box">
                <div className="logo">
                  <a href="/">
                    <img src={logo} alt="" />
                  </a>
                </div>
              </div>
              <div className="right-column">
                <div className="nav-outer">
                  <div className="mobile-nav-toggler">
                    <img src="assets/images/icons/icon-bar.png" alt="" />
                  </div>
                  <nav className="main-menu navbar-expand-md navbar-light">
                    <div
                      className="collapse navbar-collapse show clearfix"
                      id="navbarSupportedContent"
                    >
                      <ul className="navigation">
                        <li className="dropdown">
                          <a href="/">Home</a>
                        </li>
                        <li className="dropdown">
                          <a href="/about">About Us</a>
                        </li>
                        <li className="dropdown">
                          <a href="/services">Services</a>
                        </li>
                        <li>
                          <a href="/contact">Contact Us</a>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
                <div className="search-btn"></div>
                <div className="link-btn">
                  {isLogged ? (
                    <Link
                      to="/login"
                      onClick={logOut}
                      className="theme-btn btn-style-one"
                    >
                      Logout
                    </Link>
                  ) : (
                    <Link to="/login" className="theme-btn btn-style-one">
                      Login{" "}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sticky-header">
          <div className="header-upper">
            <div className="auto-container">
              <div className="inner-container">
                <div className="logo-box">
                  <div className="logo">
                    <a href="/">
                      <img src="assets/images/custom/logo.png" alt="" />
                    </a>
                  </div>
                </div>
                <div className="right-column">
                  <div className="nav-outer">
                    <div className="mobile-nav-toggler">
                      <img src="assets/images/icons/icon-bar.png" alt="" />
                    </div>

                    <nav className="main-menu navbar-expand-md navbar-light"></nav>
                  </div>
                  <div className="search-btn"></div>
                  <div className="link-btn">
                    <a href="/login" className="theme-btn btn-style-one">
                      Login
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile-menu">
          <div className="menu-backdrop"></div>
          <div className="close-btn">
            <span className="icon flaticon-remove"></span>
          </div>

          <nav className="menu-box">
            <div className="nav-logo">
              <a href="index.html">
                <img src="assets/images/logo-two.png" alt="" title="" />
              </a>
            </div>
            <div className="menu-outer"></div>
          </nav>
        </div>

        <div className="nav-overlay">
          <div className="cursor"></div>
          <div className="cursor-follower"></div>
        </div>
      </header>
    </>
  );
}

export default Header;
