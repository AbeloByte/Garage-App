import React from "react";
import Card from "../Cards/Card";
function AdminDashboard() {
  const dashboardData = [
    {
      title: "All Orders",
      category: "OPEN FOR ALL",
      link: "#",
      linkText: "LIST OF ORDERS →",
    },
    {
      title: "New Orders",
      category: "OPEN FOR LEADS",
      link: "#",
      linkText: "ADD ORDER →",
    },
    {
      title: "Employees List",
      category: "OPEN FOR ADMINS",
      link: "#",
      linkText: "LIST OF EMPLOYEES →",
    },
    {
      title: "Add Employee",
      category: "OPEN FOR ADMINS",
      link: "#",
      linkText: "READ MORE →",
    },
    {
      title: "Engine Service & Repair",
      category: "SERVICE AND REPAIRS",
      link: "#",
      linkText: "READ MORE →",
    },
    {
      title: "Tyre & Wheels",
      category: "SERVICE AND REPAIRS",
      link: "#",
      linkText: "READ MORE →",
    },
    {
      title: "Denting & Painting",
      category: "SERVICE AND REPAIRS",
      link: "#",
      linkText: "READ MORE →",
    },
    {
      title: "Denting & Painting",
      category: "SERVICE AND REPAIRS",
      link: "#",
      linkText: "READ MORE →",
    },
    {
      title: "Denting & Painting",
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
