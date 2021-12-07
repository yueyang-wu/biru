import React, { useState } from "react";
import PropTypes from "prop-types";

import { Modal } from "react-bootstrap";

export default function SigninModal({ show, onHide }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ageChecked, setAgeChecked] = useState(false);
  const [flag, setFlag] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
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
          <Modal.Title>Signin</Modal.Title>
          <button
            type="button"
            className="btn-close"
            onClick={onHide}
            aria-label="Close"
          ></button>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              value={username}
              className="form-control"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="password"
              name="password"
              value={password}
              className="form-control"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={ageChecked}
                onChange={(e) => {
                  setAgeChecked(e.target.checked);
                }}
                required="required"
              />
              <div className="form-check-label" for="agecheck">
                I am at age 21 or older.
              </div>
            </div>
            {flag && (
              <div className="errorMsg">
                Can not sign in the user, please try again.
              </div>
            )}
            <button
              disabled={!username || !password || !ageChecked}
              className="w-100 btn btn-lg btn-success sign-out-btn"
              type="submit"
            >
              Signin
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

SigninModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};
