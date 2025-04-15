import React from "react";

import turbocharger from "../../../../assets/images/icons/Turbocharger.png";
import brake from "../../../../assets/images/Service Images/brake-disk.png";
import autoTransmission from "../../../../assets/images/Service Images/automatic-transmission.png";
import flatTire from "../../../../assets/images/Service Images/flat-tire.png";
import sprayGun from "../../../../assets/images/Service Images/spray-gun.png";
import carEngine from "../../../../assets/images/Service Images/car-engine.png";
import Card from "../../Admin/Cards/Card";

function ServiceSection() {
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
      <section className="service-section quality-section">
        <div className="container  py-5">
          <div className="quality-contact-title">
            <h2 className=" mb-4">Our Services</h2>
            <p className="paragraph-content">
              Bring to the table win-win survival strategies to ensure proactive
              domination. At the end of the day, going forward, a new normal
              that has evolved from generation X is on the runway heading
              towards a streamlined cloud solution.
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
    </>
  );
}

export default ServiceSection;
