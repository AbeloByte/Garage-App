import React from "react";
import HeroTop from "../components/Sections/HeroTop/HeroTop";
import Appointement from "../components/Sections/Appointement/Appointement";
import { ImLocation } from "react-icons/im";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import MapComponent from "../components/Map/MapComponent";

function Contact() {
  return (
    <>
      <HeroTop pageTitle="Contact Us" page="Contact" />
      <section className="contact-section">
        <div className="container d-flex flex-wrap  justify-content-between  ">
          <div className="map-section mr-5">
            <MapComponent />
          </div>
          <div className="contact-info ml-5">
            <h2>Our Address</h2>
            <p>
              Completely synergize resource taxing relationships via premier
              niche markets.Professionally cultivate one-to-one customer service
            </p>

            <ul className="lists">
              <li className="d-flex align-items-center m">
                <ImLocation color="red" size={30} />
                <div className="ml-3">
                  <h4>Address</h4>
                  <p>Adama Bole , near to ASTU</p>
                </div>
              </li>
              <li className="d-flex align-items-center m">
                <MdOutlineEmail color="red" size={30} />
                <div className="ml-3">
                  <h4>Email</h4>
                  <p>contact@abegarage.com</p>
                </div>
              </li>
              <li className="d-flex align-items-center m">
                <MdOutlinePhone color="red" size={30} />
                <div className="ml-3">
                  <h4>Phone</h4>
                  <p> 0987090231 / 0984981703</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <Appointement />
    </>
  );
}

export default Contact;
