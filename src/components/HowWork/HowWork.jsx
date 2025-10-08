import React from "react";
import "./HowWork.css";
import {
  FaUserCog,
  FaUserPlus,
  FaIdCard,
  FaCheckCircle,
  FaSyncAlt,
  FaChartPie,
} from "react-icons/fa";

function HowWork() {
  return (
    <section id="how-it-works" className="how-it-works">
      <div className="how-work-container">
        <h2 className="how-work-title">
          <span className="highlight">How</span> It Works
        </h2>
        <div className="how-work-steps">
          <div className="how-work-step-left">
            <div className="how-work-icon">
              <FaUserCog className="icon-left" />
              <button className="how-work-button">
                Seamless Company Setup
              </button>
            </div>
            <div className="how-work-icon">
              <FaUserPlus className="icon-left" />
              <button className="how-work-button">
                Simple User Onboarding
              </button>
            </div>
            <div className="how-work-icon">
              <FaIdCard className="icon-left" />
              <button className="how-work-button">Fast ID Scan</button>
            </div>
          </div>

          <hr className="vertical-hr" />

          <div className="how-work-step-right">
            <div className="how-work-icon">
              <button className="how-work-button">
                Instant Smart Verification
              </button>
              <FaCheckCircle className="icon-right" />
            </div>
            <div className="how-work-icon">
              <button className="how-work-button">
                Effortless Access Control
              </button>
              <FaSyncAlt className="icon-right" />
            </div>
            <div className="how-work-icon">
              <button className="how-work-button">
                Clear Insights & Reports
              </button>
              <FaChartPie className="icon-right" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowWork;
