import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaPlayCircle } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import oil from "../../assets/images/Display-Images/oil.jpg";
import speedGage from "../../assets/images/Display-Images/speed-Gage.jpg";
import gear from "../../assets/images/Display-Images/Gear.jpg";
import carOil from "../../assets/images/Display-Images/carOil.jpg";
import turbocharger from "../../assets/images/icons/Turbocharger.png";
import brake from "../../assets/images/Service Images/brake-disk.png";
import autoTransmission from "../../assets/images/Service Images/automatic-transmission.png";
import flatTire from "../../assets/images/Service Images/flat-tire.png";
import sprayGun from "../../assets/images/Service Images/spray-gun.png";
import carEngine from "../../assets/images/Service Images/car-engine.png";
import carimage from "../../assets/images/Display-Images/car-col.png";
import mechanic from "../../assets/images/icons/car.png";
import priceTag from "../../assets/images/icons/price-tag.png";
import trophy from "../../assets/images/icons/trophy.png";
import wrench from "../../assets/images/icons/wrench.png";
import { Check } from "lucide-react";

import { Link } from "react-router-dom";

import Card from "../components/Admin/Cards/Card";
function Home() {
  const services = [
    {
      title: "Performance Upgrade",
      img: turbocharger,
      category: "SERVICE AND REPAIRS",
      link: "#",
      linkText: "Read More + ",
    },
    {
      title: "Transmission Services",
      img: autoTransmission,
      category: "SERVICE AND REPAIRS",
      link: "#",
      linkText: "Read More + ",
    },
    {
      title: "Break Repair & Service",
      img: brake,
      category: "SERVICE AND REPAIRS",
      link: "#",
      linkText: "Read More + ",
    },
    {
      title: "Engine Service & Repair",
      img: carEngine,
      category: "SERVICE AND REPAIRS",
      link: "#",
      linkText: "Read More + ",
    },
    {
      title: "Tyre & Wheels",
      img: flatTire,
      category: "SERVICE AND REPAIRS",
      link: "#",
      linkText: "Read More + ",
    },
    {
      title: "Denting & Painting",
      img: sprayGun,
      category: "SERVICE AND REPAIRS",
      link: "#",
      linkText: "Read More + ",
    },
  ];

  return (
    <>
      <>
        <div className="homepage ">
          {/* Hero Section */}
          <div className="hero-section    hero-Img contact-section ">
            <div className=" hero-contact-title   hero-content d-flex justify-content-start align-items-center flex-column">
              <div className=" ml-5 heropage-title ">
                <h5 className="text-white">Working since 1992</h5>
                <h2 className="fw-bold text-white fs-1">
                  Tuneup Your Car to Next Level
                </h2>

                <div className="d-flex align-items-center gap-2 mt-3 contact-title">
                  <FaPlayCircle className="" color="red" size={70} /> WATCH
                  INTRO VIDEO ABOUT US
                </div>
              </div>
            </div>
          </div>

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
                  <h2 className="fw-bold my-3 ">
                    We have 24 years experience{" "}
                  </h2>
                  <div>
                    <p className="paragraph-content">
                      Bring to the table win-win survival strategies to ensure
                      proactive domination. At the end of the day, going
                      forward, a new normal that has evolved from generation X
                      is on the runway heading towards a streamlined cloud
                      solution. User generated content in real-time will have
                      multiple touchpoints for offshoring.
                    </p>
                    <p className="paragraph-content">
                      {" "}
                      Capitalize on low hanging fruit to identify a ballpark
                      value added activity to beta test. Override the digital
                      divide with additional clickthroughs from DevOps.
                      Nanotechnology immersion along the information highway
                      will close the loop on focusing.
                    </p>
                  </div>

                  <button className="theme-btn btn-style-one">
                    <span className="mr-2">ABOUT US </span> <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="service-section quality-section">
            <div className="container  py-5">
              <div className="quality-contact-title">
                <h2 className=" mb-4">Our Services</h2>
                <p className="paragraph-content">
                  Bring to the table win-win survival strategies to ensure
                  proactive domination. At the end of the day, going forward, a
                  new normal that has evolved from generation X is on the runway
                  heading towards a streamlined cloud solution.
                </p>
              </div>

              <div className="row g-7 mt-5">
                {services.map((card, index) => (
                  <Card
                    key={index}
                    category={card.category}
                    title={card.title}
                    link={card.link}
                    img={card.img}
                    linkText={card.linkText}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Quality Service Section */}
          <section className=" quality-service-section ">
            <div className="container d-flex ">
              <div className="quality-service-content">
                <h2 className="text-white fw-bold mb-4">
                  Quality Service And <br />
                  Customer Satisfaction !!
                </h2>
                <p className="text-white mb-0  text-start ">
                  We utilize the most recent symptomatic gear to ensure your
                  vehicle is fixed or adjusted appropriately and in an opportune
                  manner. We are an individual from Professional Auto Service, a
                  first class execution arrange, where free assistance offices
                  share shared objectives of being world-class car
                  administration focuses.
                </p>
              </div>
              <img
                src={speedGage}
                alt=""
                className="img-fluid d-none d-lg-block col-md-5 "
              />
            </div>
          </section>

          {/* Why Choose Us & Additional Services */}
          <section className="my-5  ">
            <div className="container d-flex flex-column flex-md-row justify-content-between ">
              <div className="quality-section col-md-6 mb-4">
                <div className="quality-contact-title">
                  <h2>Why Choose Us</h2>
                </div>
                <p>
                  Bring to the table win-win survival strategies to ensure
                  proactive domination. At the end of the day, going forward, a
                  new normal that has evolved from generation heading towards.
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
                    <h4>Fast And Quah4ty Service</h4>
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

          {/* Leadership Section */}
          <div className="leadership-section py-5 ">
            <div className="d-flex container align-items-start flex-column leadership-contact-title text-white ">
              <h5 className="mb-3">Working since 1992</h5>
              <h2 className="text-white   mb-4">
                We are leader <br />
                in Car Mechanical Work
              </h2>

              <div className="d-flex align-items-center gap-2 mt-3 contact-title">
                <FaPlayCircle className="" color="red" size={70} />
                <h6 className="ml-3">
                  {" "}
                  WATCH INTRO VIDEO <br />
                  ABOUT US
                </h6>
              </div>
            </div>
          </div>

          {/* Appointment Call-To-Action */}
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
        </div>
      </>
    </>
  );
}

export default Home;
