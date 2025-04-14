import React from "react";
import Card from "../Cards/Card";
import turbocharger from "../../../../assets/images/icons/Turbocharger.png";
import brake from "../../../../assets/images/Service Images/brake-disk.png";
import autoTransmission from "../../../../assets/images/Service Images/automatic-transmission.png";
import flatTire from "../../../../assets/images/Service Images/flat-tire.png";
import sprayGun from "../../../../assets/images/Service Images/spray-gun.png";
import carEngine from "../../../../assets/images/Service Images/car-engine.png";
function AdminDashboard() {
  const dashboardData = [
    {
      title: "All Orders",
      img: turbocharger,
      category: "OPEN FOR ALL",
      link: "#",
      linkText: "LIST OF ORDERS →",
    },
    {
      title: "New Orders",
      img: autoTransmission,
      category: "OPEN FOR LEADS",
      link: "#",
      linkText: "ADD ORDER →",
    },
    {
      title: "Employees List",
      img: brake,
      category: "OPEN FOR ADMINS",
      link: "#",
      linkText: "LIST OF EMPLOYEES →",
    },
    {
      title: "Add Employee",
      img: flatTire,
      category: "OPEN FOR ADMINS",
      link: "#",
      linkText: "READ MORE →",
    },
    {
      title: "Engine Service & Repair",
      img: carEngine,
      category: "SERVICE AND REPAIRS",
      link: "#",
      linkText: "READ MORE →",
    },
    {
      title: "Tyre & Wheels",
      img: flatTire,
      category: "SERVICE AND REPAIRS",
      link: "#",
      linkText: "READ MORE →",
    },
    {
      title: "Denting & Painting",
      category: "SERVICE AND REPAIRS",
      img: sprayGun,
      link: "#",
      linkText: "READ MORE →",
    },
    {
      title: "Denting & Painting",
      img: sprayGun,
      category: "SERVICE AND REPAIRS",
      link: "#",
      linkText: "READ MORE →",
    },
    {
      title: "Denting & Painting",
      img: sprayGun,
      category: "SERVICE AND REPAIRS",
      link: "#",
      linkText: "READ MORE →",
    },
  ];
  return (
    <>
      <div className="container py-5 admin-dashboard contact-section">
        <div className="contact-title">
          <h1 className="text-bold">Admin Dashboard </h1>
        </div>
        <p className="text-muted">
          Bring to the table win-win survival strategies to ensure proactive
          domination...
        </p>

        <div className="row g-8">
          {dashboardData.map((card, index) => (
            <Card
              key={index}
              category={card.category}
              title={card.title}
              img={card.img}
              link={card.link}
              linkText={card.linkText}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
