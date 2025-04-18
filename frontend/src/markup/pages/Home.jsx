import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaPlayCircle } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
// import oil from "../../assets/images/Display-Images/oil.jpg";

import { Check } from "lucide-react";

import { Link } from "react-router-dom";

import Card from "../components/Admin/Cards/Card";
import Experiance from "../components/Sections/Experiance/Experiance";
import ServiceSection from "../components/Sections/SeviceSection/ServiceSection";
import QualityService from "../components/Sections/SeviceSection/QualityService";
import WhyWe from "../components/Sections/WhyWe/WhyWe";
import Appointement from "../components/Sections/Appointement/Appointement";
import LeaderShip from "../components/Sections/WhyWe/LeaderShip";
function Home() {
  return (
    <>
      <>
        <div className="homepage ">
          {/* Hero Section */}
          <div className="hero-section    hero-Img contact-section ">
            <div className=" hero-contact-title   hero-content d-flex justify-content-start align-items-center flex-column">
              <div className="container  ml-5 heropage-title  ">
                <h5 className="text-white">Working since 1992</h5>
                <h2 className="fw-bold text-white fs-1">
                  Tune up Your Car <br />
                  to Next Level
                </h2>

                <div className="d-flex align-items-center gap-2 mt-3 text-start contact-title">
                  <FaPlayCircle className="" color="red" size={70} />{" "}
                  <span className="ml-2">
                    WATCH INTRO VIDEO <br />
                    ABOUT US
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Experiance />
          {/* Services Section */}
          <ServiceSection />
          {/* Quality Service Section */}
          <QualityService />

          {/* Why Choose Us Section */}
          <WhyWe />

          {/* Leadership Section */}
          <LeaderShip />
          {/* Appointment Call-To-Action */}
          <Appointement />
        </div>
      </>
    </>
  );
}

export default Home;
