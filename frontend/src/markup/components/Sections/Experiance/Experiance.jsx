import React from "react";
import gear from "../../../../assets/images/Display-Images/Gear.jpg";
import carOil from "../../../../assets/images/Display-Images/carOil.jpg";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
function Experiance() {
  return (
    <>
      {/* Experience Section */}
      <section className="experiance-section my-5 container py-5 ">
        <div className="row align-items-center ">
          <div className="col-md-5">
            <div className="d-flex row justify-content-center  align-items-center img-content">
              <img src={carOil} alt="Oil" className="img-fluid" />
              <img src={gear} alt="Gear" className="img-fluid" />
            </div>
          </div>
          <div className="col-md-7">
            <div className="experiance-content ">
              <h5 className="fw-bold">Welcome to Our workshop</h5>
              <h2 className="fw-bold my-3 ">We have 24 years experience </h2>
              <div>
                <p className="paragraph-content">
                  Bring to the table win-win survival strategies to ensure
                  proactive domination. At the end of the day, going forward, a
                  new normal that has evolved from generation X is on the runway
                  heading towards a streamlined cloud solution. User generated
                  content in real-time will have multiple touchpoints for
                  offshoring.
                </p>
                <p className="paragraph-content">
                  {" "}
                  Capitalize on low hanging fruit to identify a ballpark value
                  added activity to beta test. Override the digital divide with
                  additional clickthroughs from DevOps. Nanotechnology immersion
                  along the information highway will close the loop on focusing.
                </p>
              </div>

              <button className="theme-btn btn-style-one">
                <span className="mr-2">
                  <Link to="/about">ABOUT US</Link>{" "}
                </span>{" "}
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Experiance;
