import React from "react";

import "./css/Banner.css";

export default function Banner() {
  return (
    <div className="banner-container">
      <div className="banner-img-container">
        <img
          className="banner-background-img"
          src={process.env.PUBLIC_URL + "/images/bg1.jpg"}
          alt="banner"
        />
      </div>
      <div className="banner-text">
        <div className="banner-text-row1">Welcome to</div>
        <div className="banner-text-row2">Biru-Biru~</div>
        <div className="banner-text-row3">Share your feeling about beers</div>
      </div>
    </div>
  );
}
