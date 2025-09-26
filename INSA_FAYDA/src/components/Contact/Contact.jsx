import React from "react";
import "./Contact.css";
import {
  FaEnvelope,
  FaPhone,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaTelegramPlane,
  FaTiktok,
} from "react-icons/fa";

const socialIcons = [
  { name: "Facebook", icon: <FaFacebookF />, link: "https://facebook.com" },
  { name: "X", icon: <FaTwitter />, link: "https://twitter.com" },
  { name: "YouTube", icon: <FaYoutube />, link: "https://youtube.com" },
  { name: "LinkedIn", icon: <FaLinkedinIn />, link: "https://linkedin.com" },
  { name: "Telegram", icon: <FaTelegramPlane />, link: "https://telegram.org" },
  { name: "TikTok", icon: <FaTiktok />, link: "https://tiktok.com" },
];

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-con">
        <div className="contact">
          <h1 className="contact-title">Contact With Us</h1>
          <div className="social-icons-container">
            {socialIcons.map((social, index) => (
              <a
                className="social-icons"
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="contact-description">
            For any comments free to contact us here
          </p>
        </div>
        <div>
          <form className="contact-form">
            <div>
              <h3>Name</h3>
              <input
                className="form-input"
                type="text"
                name="name"
                placeholder="Name"
                required
              />
            </div>
            <div>
              <h3>Email</h3>
              <input
                className="form-input"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
          </form>
        </div>
        <div>
          <p>Comments</p>
          <textarea
            className="form-textarea"
            placeholder="Your Comments"
          ></textarea>
        </div>
        <div className="contact-inf">
          <p>Address: Addis Ababa - INSA</p>
          <div>
            <p>
              <FaEnvelope className="email-icon" />
              info@example.com
            </p>
            <p>
              <FaPhone className="phone-icon" />
              +1234567890
            </p>
          </div>
          <div className="link-special">
            <a className="special-link" href="http://example.com">
              Link
            </a>
          </div>
          <div className="link-container">
            <p>
              <a href="/services">Services</a>|<a href="/contact">Contact</a>|
              <a href="/about">About Us</a>|
              <i className="fa fa-copyright" aria-hidden="true">
                Copy Right policy
              </i>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
