import React from "react";
import HeroTop from "../components/Sections/HeroTop/HeroTop";
import ServiceSection from "../components/Sections/SeviceSection/ServiceSection";
import WhyWe from "../components/Sections/WhyWe/WhyWe";
import LeaderShip from "../components/Sections/WhyWe/LeaderShip";
import Appointement from "../components/Sections/Appointement/Appointement";

function Services() {
  return (
    <>
      <HeroTop pageTitle="Our Services" page="Services" />
      <ServiceSection />
      <WhyWe />
      <LeaderShip />
      <Appointement />
    </>
  );
}
export default Services;
