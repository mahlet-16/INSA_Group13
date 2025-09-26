import React from "react";
import "./ServiceHeader.css";

const ServiceHeader = () => {
  return (
    <section className="service-header">
      <div className="overlay">
        <h1 className="service-header-title">
          FaydaPass ID <span className="highlight">Services</span>
        </h1>
        <div className="box-container">
          <div className="bg-box"></div>
          <div className="bg-box"></div>
          <div className="bg-box"></div>
          <div className="bg-box"></div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHeader;
