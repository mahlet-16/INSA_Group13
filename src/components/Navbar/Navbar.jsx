// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/images/logo_only.png"; // Update the path as necessary
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css"; // Move your navbar styles here

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`hero-top ${scrolled ? "scrolled" : ""}`}>
      <div className="hero-top-left">
        <img className="logo" src={logo} alt="Logo" />
        <h1>
          Fayda<span className="highlight">Pass</span>
        </h1>
      </div>
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <nav className={`hero-top-right ${menuOpen ? "active" : ""}`}>
        <Link to="/" className="hero-link" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link
          to="/services"
          className="hero-link"
          onClick={() => setMenuOpen(false)}
        >
          Services
        </Link>

        <Link
          to="/about"
          className="hero-link"
          onClick={() => setMenuOpen(false)}
        >
          About Us
        </Link>
        <Link
          to="/contact"
          className="hero-link"
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
