import { FaPlayCircle } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

import tire from "../../assets/images/Display-Images/tire.jpg";
import { Link } from "react-router-dom";
import Experiance from "../components/Sections/Experiance/Experiance";
import WhyWe from "../components/Sections/WhyWe/WhyWe";
import LeaderShip from "../components/Sections/WhyWe/LeaderShip";
import Appointement from "../components/Sections/Appointement/Appointement";
import { FaGreaterThan } from "react-icons/fa6";
import HeroTop from "../components/Sections/HeroTop/HeroTop";
function About() {
  return (
    <>
      <div>
        {/* About Hero Section */}

        <HeroTop pageTitle="About Us" page="About" />

        <section className="about-hero-section container d-flex flex-column flex-md-row justify-content-center  my-5">
          <div className="about-hero-content col-12 col-md-7 mb-4 mb-md-0">
            <h2>
              We are highly skilled mechanics <br /> for your car repair
            </h2>
            <p>
              Bring to the table win-win survival strategies to ensure proactive
              domination. At the end of the day, going forward, a new normal
              that has evolved from generation X is on the runway heading
              towards a streamlined cloud solution. User generated content in
              real-time will have multiple touchpoints for offshoring.
            </p>
            <p>
              Capitalize on low hanging fruit to identify a ballpark value added
              activity to beta test. Override the digital divide with additional
              clickthroughs from DevOps. Nanotechnology immersion along the
              information heading towards a streamlined cloud solution. User
              generated content in real-time will have multiple.
            </p>
          </div>
          <div className="about-hero-image col-12 col-md-5">
            <img src={tire} alt="Speed Gauge" className="img-fluid" />
          </div>
        </section>

        {/* Experience Section */}
        <Experiance />

        {/* Why Choose Us & Additional Services */}
        <WhyWe />
        {/* Leadership Section */}
        <LeaderShip />
        {/* Appointment Call-To-Action */}
        <Appointement />
      </div>
    </>
  );
}

export default About;
