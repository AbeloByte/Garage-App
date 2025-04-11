import React from "react";
import { Link } from "react-router-dom";
import turbo from "../../../../assets/images/icons/Turbocharger.png";
function Card({ category, title, link, linkText }) {
  return (
    <div className="col-md-4 mb-3 ">
      <div className="card p-3 shadow-sm bottom-Border">
        <div className="card-body">
          <div className="mb-4">
            <h6 className="text-uppercase text-muted">{category}</h6>
            <h5>{title}</h5>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Link to={link} className="text-danger">
                <h6 className="fw-bold text-danger">{linkText} →</h6>
              </Link>
            </div>
            {/* image that show car nitro  */}
            <div>
              <img src={turbo} alt="" className="img-turbo-fluid" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Card;
