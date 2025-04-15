import React from "react";
import { FaPlayCircle } from "react-icons/fa";

function LeaderShip() {
  return (
    <>
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
    </>
  );
}

export default LeaderShip;
