import React from "react";

function Loading({ isLoading }) {
  if (!isLoading) return null;
  return (
    <>
      <div className="d-flex justify-content-center car-loading-container">
        <div className="car-loading">
          {/* You can use an SVG or an image of a car here */}
          <img
            src="https://img.icons8.com/ios/452/car.png"
            alt="Car Loading"
            className="car-icon"
          />
        </div>
      </div>
    </>
  );
}

export default Loading;
