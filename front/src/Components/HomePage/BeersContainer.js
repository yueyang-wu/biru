import React from "react";

import PropTypes from "prop-types";

import Beer from "./Beer";

export default function BeersContainer({ beers }) {
  return (
    <div className="beers-container">
      {beers.map((value, index) => {
        return <Beer key={value.name} beer={value} />;
      })}
    </div>
  );
}

BeersContainer.propTypes = {
  beers: PropTypes.array.isRequired,
};
