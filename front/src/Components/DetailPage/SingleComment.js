import React from "react";

import PropTypes from "prop-types";

export default function SingleComment({ comment }) {
  return (
    <div className="single-comment">
      <div className="comment-user">
        <i className="far fa-user user-icon"></i> -{" "}
        <span className="comment-user-name">{comment.user}</span>
      </div>
      <div className="comment-text">{comment.comment}</div>
    </div>
  );
}

SingleComment.propTypes = {
  comment: PropTypes.object.isRequired,
};
