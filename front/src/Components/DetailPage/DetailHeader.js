import React from "react";

import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import "./css/DetailPage.css";

export default function DetailHeader({ text }) {
  return (
    <div className="detail-header">
      <div>
        <Link to="/">
          <i class="fas fa-arrow-left go-back-link"></i>
        </Link>
        <div class="beer-detail-title">{text}</div>
      </div>
    </div>
  );
}

DetailHeader.propTypes = {
  text: PropTypes.string.isRequired,
};
