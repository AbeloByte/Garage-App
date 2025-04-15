import React from "react";
import { FaGreaterThan } from "react-icons/fa";
import { Link } from "react-router-dom";

function HeroTop(props) {
  return (
    <>
      <section className="about-top-section">
        <div className="container d-flex flex-column align-items-start text-center py-5 about-top-section-title">
          <h1>{props.pageTitle}</h1>{" "}
          <div>
            <Link to="/" className="text-decoration-none ">
              <span className="mr-2">Home</span>{" "}
            </Link>{" "}
            <FaGreaterThan size={10} />{" "}
            <span className="text-white ml-3">{props.page}</span>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroTop;
