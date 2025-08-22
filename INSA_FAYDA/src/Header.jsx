import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import nidLogo from "./Assets/NID_logo_only..png";
import heroBg from "./Assets/dr abeyahmed.jpg";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function Header() {
  const [activeTab, setActiveTab] = useState("home");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.replace("/", "") || "home";
    // normalize known routes
    const normalized = ["home", "service", "about", "contact"].includes(path)
      ? path
      : "home";
    setActiveTab(normalized);
    setMenuOpen(false); // close menu on route change
  }, [location.pathname]);

  // Handle scroll event to change header background
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50); // Change background after 50px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get header background based on scroll state and current page
  const getHeaderBackground = () => {
    // If scrolled, use the specified background color
    if (isScrolled) {
      return "#192436";
    }

    // If not scrolled and on home page, keep transparent
    if (location.pathname === "/") {
      return "transparent";
    }

    // For other pages when not scrolled, use transparent or default
    return "transparent";
  };

  const handleNav = (section) => {
    setActiveTab(section);
    if (section === "home") {
      navigate("/");
    } else {
      navigate(`/${section}`);
    }
  };

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
    <>
      <header
        className="site-header"
        style={{ background: getHeaderBackground() }}
      >
        <div className="header-content">
          <div className="header-left">
            <div className="logo">
              <img src={nidLogo} alt="FaydaPass Logo" className="logo-image" />
            </div>
            <h1 className="company-name">
              Fayda<span className="company-accent">Pass</span>
            </h1>
          </div>

          <button
            className={`header-toggle${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <span className="hamburger"></span>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
          </button>

          <nav className={`header-nav${menuOpen ? " open" : ""}`}>
            <button
              type="button"
              className={`nav-link ${activeTab === "home" ? "active" : ""}`}
              onClick={() => handleNav("home")}
            >
              Home
            </button>
            <button
              type="button"
              className={`nav-link ${activeTab === "service" ? "active" : ""}`}
              onClick={() => handleNav("service")}
            >
              Services
            </button>
            <button
              type="button"
              className={`nav-link ${activeTab === "about" ? "active" : ""}`}
              onClick={() => handleNav("about")}
            >
              About Us
            </button>
            <button
              type="button"
              className={`nav-link ${activeTab === "contact" ? "active" : ""}`}
              onClick={() => handleNav("contact")}
            >
              Contact
            </button>
          </nav>
        </div>
      </header>

      {/* Show hero only on home route */}
      {location.pathname === "/" && (
        <section className="header-hero">
          <div className="header-hero__overlay" />
          <div className="header-hero__inner">
            <h2 className="header-hero__title">
              Your <span className="accent">National</span>
              <br />
              ID, Simplified
            </h2>
            <p className="header-hero__subtitle">
              Secure, reliable, and ready when you need it — the modern way to
              manage your Fayda digital identity.
            </p>
            <div className="header-hero__actions">
              <button
                type="button"
                className="header-cta"
                onClick={handleRegisterClick}
              >
                Register
              </button>
              <button
                type="button"
                className="header-cta"
                onClick={handleLoginClick}
              >
                Login
              </button>
            </div>
          </div>
        </section>
      )}

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
    </>
  );
}

export default Header;
