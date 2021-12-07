import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";

import SingleComment from "./SingleComment";

export default function Comments({ id, user }) {
  const pageSize = 10;
  const [total, setTotal] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchComments = async (pageStart) => {
    const url = `/comments?id=${id}&start=${pageStart}&page_size=${pageSize}`;
    const res = await fetch(url);
    if (res.status === 200) {
      const allComments = await res.json();
      setComments(allComments);
      setStart(pageStart);
      setEnd(pageStart + Math.min(allComments.length, pageSize));
    } else {
      console.error(
        `Can not get comments for beer ${id} starts at ${pageStart}!`
      );
    }
  };

  const fetchTotal = async () => {
    const url = `/comments_total?id=${id}`;
    const res = await fetch(url);

    if (res.status === 200) {
      const data = await res.json();

      setTotal(data.total);
    } else {
      console.error(
        "Can not get total number of comments for beer by id " + id + "!"
      );
    }
  };

  useEffect(() => {
    fetchComments(0);
    fetchTotal();
  }, []);

  const submitComment = async () => {
    const res = await fetch("/addNewComment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        beer_id: id,
        new_comment: newComment,
      }),
    });

    if (res.status === 200) {
      resetComment();
      fetchComments(0);
      fetchTotal();
    } else {
      alert("Post new comment failed!");
    }
  };

  const resetComment = () => {
    setNewComment("");
  };

  const pervPage = () => {
    if (start > 0) {
      fetchComments(start - pageSize);
      fetchTotal();
    }
  };

  const nextPage = () => {
    if (start + pageSize < total) {
      fetchComments(start + pageSize);
      fetchTotal();
    }
  };

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  return (
    <div>
      <div className="comments-header">Comments</div>
      {user && (
        <div className="comment-input">
          <textarea
            className="comment-input-textarea"
            name="comment-input"
            cols="30"
            rows="3"
            value={newComment}
            onChange={handleNewCommentChange}
          ></textarea>
          <button
            className="btn btn-sm btn-success submit-btn"
            disabled={newComment === ""}
            onClick={submitComment}
          >
            Submit
          </button>
          <button
            className="btn btn-sm btn-secondary cancel-btn"
            disabled={newComment === ""}
            onClick={resetComment}
          >
            Cancel
          </button>
        </div>
      )}
      <div>
        {(() => {
          if (comments.length > 0) {
            return (
              <div>
                <i
                  className={
                    start > 0
                      ? "fas fa-angle-left pagination-icon"
                      : "fas fa-angle-left pagination-icon-disabled"
                  }
                  onClick={pervPage}
                ></i>
                <span>
                  {start + 1} - {end} of {total}
                </span>
                <i
                  className={
                    start + pageSize < total
                      ? "fas fa-angle-right pagination-icon"
                      : "fas fa-angle-right pagination-icon-disabled"
                  }
                  onClick={nextPage}
                ></i>
              </div>
            );
          } else {
            return (
              <div className="no-comment-msg">No Comment for this beer.</div>
            );
          }
        })()}

        {comments.map((value, index) => {
          return <SingleComment key={value.id} comment={value} />;
        })}
      </div>
    </div>
  );
}

Comments.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};
