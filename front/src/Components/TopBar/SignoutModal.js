import React, { useState } from "react";
import PropTypes from "prop-types";

import { Modal } from "react-bootstrap";

export default function SignoutModal({ show, onHide }) {
  const [flag, setFlag] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    if (response.status !== 200) {
      setFlag(true);
    } else {
      window.location.reload();
    }
  };
  return (
    <div>
      <Modal size="md" show={show} onHide={onHide}>
        <Modal.Header>
          <Modal.Title>Signout</Modal.Title>
          <button
            type="button"
            className="btn-close"
            onClick={onHide}
            aria-label="Close"
          ></button>
        </Modal.Header>
        <Modal.Body>
          <div className="signout-msg">Are you sure you want to sign out?</div>
          <form onSubmit={handleSubmit}>
            {flag && (
              <div className="errorMsg">
                Can not sign out the user, please try again.
              </div>
            )}
            <button
              className="w-100 btn btn-lg btn-success sign-out-btn"
              type="submit"
            >
              Signout
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

SignoutModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};
