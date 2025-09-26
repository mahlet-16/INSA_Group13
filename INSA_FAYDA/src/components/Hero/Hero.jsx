import React, { useState } from "react";
import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";
import "./Hero.css";

const Hero = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false);
  };

  return (
    <section className="hero">
      <div className="hero-content">
        {/* Hero Middle */}
        <div className="hero-middle">
          <div className="hero-description">
            <p className="hero-slogan">
              Your <span className="highlight">National ID</span>, Simplified
            </p>
            <p className="hero-slogan-sub">
              Secure, reliable, and ready when you need it - the modern way to
              manage your Fayda digital identity.
            </p>
            <div className="hero-buttons">
              <button className="register-button" onClick={handleRegisterClick}>
                Register
              </button>
              <button className="login-button" onClick={handleLoginClick}>
                Login
              </button>
            </div>
          </div>
          <div className="eye-catching"></div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div
          className="header-login-modal-overlay"
          onClick={handleCloseLoginModal}
        >
          <div
            className="header-login-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="header-login-close"
              onClick={handleCloseLoginModal}
            >
              ×
            </button>
            <LoginForm />
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div
          className="header-login-modal-overlay"
          onClick={handleCloseRegisterModal}
        >
          <div
            className="header-login-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="header-login-close"
              onClick={handleCloseRegisterModal}
            >
              ×
            </button>
            <RegisterForm />
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
