import React from "react";
import { Link } from "react-router-dom";
function Card({ category, title, link, linkText, img }) {
  return (
    <div className="col-md-4 mb-3 ">
      <div className="card p-3 cardstyle bottom-Border">
        <div className="card-body">
          <div className="mb-5">
            <h6 className="text-uppercase text-muted">{category}</h6>
            <h5>{title}</h5>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-0">
            <div>
              <Link to={link} className="text-danger">
                <h6 className="fw-bold text-danger">{linkText} →</h6>
              </Link>
            </div>

            <img src={img} alt="" className="img-turbo-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Card;
