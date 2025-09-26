import React from "react";
import "./Offer.css";

const Offer = () => {
  return (
    <section className="offer">
      <h1 className="offer-title">What We Offer</h1>

      <div className="offer-content">
        <div className="empty-space"></div>
        <div className="offer-details">
          <h2>Fast Onboarding</h2>
          <p>
            Get people signed in and cleared for access in seconds, not minutes.
          </p>

          <h2>Secure from the Start</h2>
          <p>
            End-to-end encrypted identity checks keep your data and facilities
            safe.
          </p>

          <h2>Always in Control</h2>
          <p>
            Real-time monitoring and reports so you know exactly who is inside
            your premises at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Offer;
