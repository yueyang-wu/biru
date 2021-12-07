import React from "react";

import PropTypes from "prop-types";

import { Link } from "react-router-dom";

export default function Beer({ beer }) {
  return (
    <div className="beer">
      <Link to={"/detail/" + beer._id} state={beer}>
        <div className="beer-img-container">
          <img
            className="beer-img"
            src={process.env.PUBLIC_URL + "/images/" + beer.img}
            alt={beer.name}
          />
        </div>
      </Link>
      <div className="beer-text">
        {beer.name} - <i class="far fa-thumbs-up like-icon"></i> {beer.like}{" "}
        <i class="far fa-thumbs-down dislike-icon"></i> {beer.dislike}
      </div>
    </div>
  );
}

Beer.propTypes = {
  beer: PropTypes.object.isRequired,
};
