import React from "react";

import carimage from "../../../../assets/images/Display-Images/car-col.png";
import mechanic from "../../../../assets/images/icons/car.png";
import priceTag from "../../../../assets/images/icons/price-tag.png";
import trophy from "../../../../assets/images/icons/trophy.png";
import wrench from "../../../../assets/images/icons/wrench.png";
function WhyWe() {
  return (
    <>
      {/* Why Choose Us & Additional Services */}
      <section className="my-5  ">
        <div className="container d-flex flex-column   flex-md-row justify-content-between ">
          <div className="quality-section col-md-6 mb-4 ">
            <div className="quality-contact-title">
              <h2>Why Choose Us</h2>
            </div>
            <p>
              Bring to the table win-win survival strategies to ensure proactive
              domination. At the end of the day, going forward, a new normal
              that has evolved from generation heading towards.
            </p>
            <div className="quality-service-lists">
              <div>
                <span>
                  <img src={mechanic} alt="" />
                </span>
                <h4>Certified Expert Mechanics</h4>
              </div>
              <div>
                <span>
                  <img src={wrench} alt="" />
                </span>
                <h4>Fast And Quality Service</h4>
              </div>
              <div>
                <span>
                  <img src={priceTag} alt="" />
                </span>
                <h4>Best Prices in Town</h4>
              </div>
              <div>
                <span>
                  <img src={trophy} alt="" />
                </span>
                <h4>Awarded Workshop</h4>
              </div>
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="quality-section ">
              <div className="quality-contact-title">
                <h2>Additional Services</h2>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center additionalServiceList">
              <img src={carimage} alt="" className="qualityServiceimg" />
              <div className="quality-service-second ml-4">
                <ul className="list">
                  <li> General Auto Repair & Maintenance</li>
                  <li> Transmission Repair & Replacement</li>
                  <li> Tire Repair and Replacement</li>
                  <li> State Emissions Inspection</li>
                  <li> Break Job / Break Services</li>
                  <li> Electrical Diagnostics</li>
                  <li> Fuel System Repairs</li>
                  <li> Starting and Charging Repair</li>
                  <li> Steering and Suspension Work</li>
                  <li> Emission Repair Facidivty</li>
                  <li> Wheel Adivgnment</li>
                  <li> Computer Diagaonstic Testing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default WhyWe;
