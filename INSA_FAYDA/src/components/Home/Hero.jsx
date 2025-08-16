import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
import logo from "../../assets/images/NID_logo_only.png";
import dart from "../../assets/images/dart.png";
import { FaBars, FaTimes } from "react-icons/fa";

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="hero">
      <div className="hero-content">
        <div className={`hero-top ${scrolled ? "scrolled" : ""}`}>
          <div className="hero-top-left">
            <img className="logo" src={logo} alt="Logo" />
            <h1>
              Fayda<span className="highlight">Pass</span>
            </h1>
          </div>
          {/* Hamburger icon for mobile */}
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
          <nav className={`hero-top-right ${menuOpen ? "active" : ""}`}>
            <Link
              to="#home"
              className="hero-link"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="#services"
              className="hero-link"
              onClick={() => setMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="#how-it-works"
              className="hero-link"
              onClick={() => setMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              to="#about"
              className="hero-link"
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="#contact"
              className="hero-link"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
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
              <button className="register-button">Register</button>
              <button className="login-button">Login</button>
            </div>
            <img className="dart" src={dart} alt="Dart" />
          </div>
          <div className="eye-catching"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
