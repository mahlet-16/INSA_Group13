import React from "react";
import "./About.css";

function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2 className="about-title">
          About <span className="highlight">FaydaPass</span>
        </h2>
        <div className="about-description">
          <h3 className="about-subtitle">
            Bringing Secure Access Closer to Communities
          </h3>
          <p>
            Empowering Ethiopian institutions with fast, reliable National ID
            verification at community centers, schools, offices, and government
            facilities—ensuring smooth identity validation for safer, more
            efficient services.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
