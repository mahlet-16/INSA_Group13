import React from 'react';
import { FiBriefcase, FiUsers, FiMaximize, FiCheckCircle, FiShield, FiBarChart2, FiIdCard, FiZap, FiLock } from 'react-icons/fi';
import { HiOutlineIdentification } from 'react-icons/hi';
import './HowItWorks.css';

function FeatureItem({ icon: Icon, text }) {
  return (
    <div className="hiw-feature-item">
      <div className="hiw-feature-icon">
        <Icon size={28} />
      </div>
      <div className="hiw-feature-text">{text}</div>
    </div>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="hiw-section">
      <div className="hiw-overlay" />
      <div className="hiw-container">
        {/* Title section - independent and separate */}
        <div className="hiw-title-section">
          <h2 className="hiw-title">
            <span className="hiw-accent">How</span> It Works
          </h2>
        </div>
        
        {/* Features content section */}
        <div className="hiw-content">
          {/* Left side with 3 features */}
          <div className="hiw-left-side">
            <div className="hiw-features-left">
              <FeatureItem icon={FiCheckCircle} text="Instant Smart Verification" />
              <FeatureItem icon={FiBriefcase} text="Seamless Company Setup" />
              <FeatureItem icon={FiUsers} text="Simple User Onboarding" />
            </div>
          </div>

          {/* Vertical divider */}
          <div className="hiw-divider" aria-hidden="true" />

          {/* Right side with 3 features */}
          <div className="hiw-right-side">
            <div className="hiw-features-right">
              <FeatureItem icon={FiLock} text="Effortless Access Control" />
              <FeatureItem icon={HiOutlineIdentification} text="Fast ID Scan" />
              <FeatureItem icon={FiBarChart2} text="Clear Insights & Reports" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;


