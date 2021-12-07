import React, { useState, useEffect } from "react";

import SigninModal from "./SigninModal";
import SignupModal from "./SignupModal";
import SignoutModal from "./SignoutModal";

import "./css/TopBar.css";

export default function TopBar() {
  const [showSigninModal, setShowSigninModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSignoutModal, setShowSignoutModal] = useState(false);

  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    setIsFetchingUser(true);
    const res = await fetch("/getUser");
    if (res.status === 200) {
      setUser(await res.json());
    } else {
      setUser(null);
    }
    setIsFetchingUser(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <SigninModal
        show={showSigninModal}
        onHide={() => {
          setShowSigninModal(false);
        }}
      />
      <SignupModal
        show={showSignupModal}
        onHide={() => {
          setShowSignupModal(false);
        }}
      />
      <SignoutModal
        show={showSignoutModal}
        onHide={() => {
          setShowSignoutModal(false);
        }}
      />
      <header>
        <nav className="navbar navbar-expand-md navbar-light fixed-top">
          <div className="container-fluid">
            <span className="navbar-brand">BiruBiru~</span>
            <div class="to-right">
              {isFetchingUser ? (
                <div></div>
              ) : !user ? (
                <div>
                  <button
                    className="btn btn-outline-success top-bar-btn"
                    onClick={() => setShowSigninModal(true)}
                  >
                    Signin
                  </button>
                  <button
                    className="btn btn-outline-primary top-bar-btn"
                    onClick={() => setShowSignupModal(true)}
                  >
                    Signup
                  </button>
                </div>
              ) : (
                <div>
                  <div className="greeting">Cheers {user}!</div>
                  <button
                    className="btn btn-outline-success top-bar-btn"
                    onClick={() => setShowSignoutModal(true)}
                  >
                    Signout
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
