import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Appointement() {
  return (
    <>
      <div className=" text-white appointment-section p-5 text-center py-4">
        <div className="container appointment-section-tag d-flex flex-wrap justify-content-between align-items-center text-white">
          <div>
            <h2>Schedule Your Appointment Today</h2>
            <h6>Your Automotive Repair & Maintenance Service Specialist</h6>
          </div>
          <div>
            <h2>1800.456.7890</h2>
          </div>
          <div className="Contact-btn">
            <button className="py-3 px-5 ">
              <Link to="/contact" className="text-decoration-none">
                <span className="mr-2">CONTACT US </span>{" "}
                <FaArrowRight color="black" />
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Appointement;
