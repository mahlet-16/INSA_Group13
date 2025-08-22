import React from 'react';
import aboutImage from './Assets/about1.jpg';
import './AboutSection.css';

function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-container">
        <h1 className="about-title">
          <span className="about-title-about">About</span>
          <span className="about-title-faydapass">FaydaPass</span>
        </h1>
        
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-heading">Bringing Secure Access Closer to Communities</h2>
            <p className="about-description">
              Empowering Ethiopian institutions with fast, reliable National ID verification at community centers, schools, offices, and government facilities—ensuring smooth identity validation for safer, more efficient services.
            </p>
          </div>
          
          <div className="about-image">
            <img src={aboutImage} alt="Ethiopian Digital ID Card" className="about-img" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
