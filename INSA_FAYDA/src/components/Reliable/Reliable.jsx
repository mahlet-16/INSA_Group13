import React from "react";
import "./Reliable.css";
import reliableImage from "../../Assets/images/reliable.jpg";

const Reliable = () => {
  return (
    <section className="reliable">
      <div className="reliable-content">
        <h1 className="reliable-title">
          Reliable ID Services for Every Sector
        </h1>
        <p className="reliable-description">
          At FAYDA National ID Verification & Access Control, we deliver secure,
          efficient, and reliable access management for Ethiopian institutions,
          companies, and facilities. Fully integrated with the official National
          ID, our platform makes verification instant, accurate, and
          trustworthy.
          <br></br>
          Both platform and company admins can manage users, control access, and
          monitor activities in real time — whether it’s a school, office, or
          government facility, FAYDA keeps entry simple and secure.
        </p>
      </div>
      <div className="reliable-image-container">
        <img
          className="reliable-image"
          src={reliableImage}
          alt="Reliable ID Services"
        />
      </div>
    </section>
  );
};

export default Reliable;
