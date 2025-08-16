import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div>
          <h1 className="contact-title">Contact With Us</h1>
          <p className="contact-description">
            For any comments free to contact us here
          </p>
        </div>
        <div>
          <form className="contact-form">
            <input
              className="form-input"
              type="text"
              name="name"
              placeholder="Name"
              required
            />
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </form>
        </div>
        <div>
          <p>Comments</p>
          <textarea
            className="form-textarea"
            placeholder="Your Comments"
          ></textarea>
        </div>
        <div className="contact-info">
          <p>Email: info@example.com</p>
          <p>Phone: +1234567890</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
