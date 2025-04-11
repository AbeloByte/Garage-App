import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaPlayCircle } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import oil from "../../assets/images/Display-Images/oil.jpg";
import speedGage from "../../assets/images/Display-Images/speed-Gage.jpg";
import gear from "../../assets/images/Display-Images/Gear.jpg";
import carOil from "../../assets/images/Display-Images/carOil.jpg";
function Home() {
  return (
    <>
      <>
        <div className="homepage ">
          {/* Hero Section */}
          <div className="hero-section   hero-Img contact-section ">
            <div className="contact-section  hero-content d-flex justify-content-start align-items-center flex-column">
              <div className="contact-title ml-5 heropage-title ">
                <h5 className="text-white">Working since 1992</h5>
                <h1 className="fw-bold text-white fs-1">
                  Tuneup Your Car to Next Level
                </h1>

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
          {/* <Container className="my-5">
            <h3 className="mb-4">Our Services</h3>
            <Row>
              {[
                "Performance Upgrade",
                "Transmission Services",
                "Break Repair & Service",
                "Engine Service & Repair",
                "Tyre & Wheels",
                "Denting & Painting",
              ].map((service, index) => (
                <Col md={4} className="mb-4" key={index}>
                  <Card className="h-100">
                    <Card.Body>
                      <Card.Title>{service}</Card.Title>
                      <Button variant="link" className="p-0">
                        Read More +
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container> */}
          <section className="container">
            <h2 className="contact-title  mb-4">Our Services</h2>
            <div></div>
          </section>

          {/* Quality Service Section */}
          <div className="bg-danger text-white py-5 text-center">
            <Container>
              <h4>Quality Service And Customer Satisfaction !!</h4>
              <p>
                We utilize the most recent symptomatical gear to ensure your
                vehicle is fitted...
              </p>
            </Container>
          </div>

          {/* Why Choose Us & Additional Services */}
          <Container className="my-5">
            <Row>
              <Col md={6}>
                <h4>Why Choose Us</h4>
                <ul>
                  <li>Certified Expert Mechanics</li>
                  <li>Fast And Quality Service</li>
                  <li>Best Prices in Town</li>
                  <li>Awarded Workshop</li>
                </ul>
              </Col>
              <Col md={6}>
                <h4>Additional Services</h4>
                <ul>
                  <li>General Auto Repair & Maintenance</li>
                  <li>Transmission Repair & Replacement</li>
                  <li>Tire Repair and Replacement</li>
                  <li>State Emissions Inspection</li>
                  <li>Electrical Diagnostics</li>
                  <li>Full System Repairs</li>
                  <li>And more...</li>
                </ul>
              </Col>
            </Row>
          </Container>

          {/* Leadership Section */}
          <div className="bg-dark text-white py-5 text-center">
            <Container>
              <h6>Working since 1992</h6>
              <h2>We are leader in Car Mechanical Work</h2>
              <Button variant="danger" className="mt-3">
                WATCH INTRO VIDEO
              </Button>
            </Container>
          </div>

          {/* Appointment Call-To-Action */}
          <div className="bg-danger text-white text-center py-4">
            <Container>
              <h5>Schedule Your Appointment Today</h5>
              <h3>1800.456.7890</h3>
              <Button variant="light">CONTACT US</Button>
            </Container>
          </div>
        </div>
      </>
    </>
  );
}

export default Home;
