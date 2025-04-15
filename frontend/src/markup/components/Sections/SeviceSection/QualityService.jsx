import React from "react";
import speedGage from "../../../../assets/images/Display-Images/speed-Gage.jpg";

function QualityService() {
  return (
    <>
      <section className=" quality-service-section ">
        <div className="container d-flex ">
          <div className="quality-service-content">
            <h2 className="text-white fw-bold mb-4">
              Quality Service And <br />
              Customer Satisfaction !!
            </h2>
            <p className="text-white mb-0  text-start ">
              We utilize the most recent symptomatic gear to ensure your vehicle
              is fixed or adjusted appropriately and in an opportune manner. We
              are an individual from Professional Auto Service, a first class
              execution arrange, where free assistance offices share shared
              objectives of being world-class car administration focuses.
            </p>
          </div>
          <img
            src={speedGage}
            alt=""
            className="img-fluid d-none d-lg-block col-md-5 "
          />
        </div>
      </section>
    </>
  );
}

export default QualityService;
