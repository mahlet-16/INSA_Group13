import React, { useState } from "react";
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
import axios from "axios"; // optional, only if you plan to send data to a backend

const socialIcons = [
  { name: "Facebook", icon: <FaFacebookF />, link: "https://facebook.com" },
  { name: "X", icon: <FaTwitter />, link: "https://twitter.com" },
  { name: "YouTube", icon: <FaYoutube />, link: "https://youtube.com" },
  { name: "LinkedIn", icon: <FaLinkedinIn />, link: "https://linkedin.com" },
  { name: "Telegram", icon: <FaTelegramPlane />, link: "https://telegram.org" },
  { name: "TikTok", icon: <FaTiktok />, link: "https://tiktok.com" },
];

function Contact() {
  // --- Step 1: Manage form state ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // --- Step 2: Update state when user types ---
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // --- Step 3: Handle form submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Example: Send to backend API
      // await axios.post("http://localhost:5000/contact", formData);

      console.log("Submitted Data:", formData); // for now, just show in console
      setMessage("Your message has been sent successfully!");
      setFormData({ name: "", email: "", comment: "" }); // reset form
    } catch (error) {
      setMessage("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

        <p className="contact-description">
          For any comments feel free to contact us here
        </p>

        {/* Step 4: Integrated Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="name-email">
            <div>
              <h3>Name</h3>
              <input
                className="form-input"
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <h3>Email</h3>
              <input
                className="form-input"
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="message-send">
            <h3>Comments</h3>
            <textarea
              className="form-textarea"
              name="comment"
              placeholder="Your Comments"
              value={formData.comment}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" className="submit-message" disabled={loading}>
              {loading ? "Sending..." : "Submit"}
            </button>
          </div>
        </form>

        {message && <p className="submit-feedback">{message}</p>}

        <div className="address">
          <div className="contact-inf">
            <p>Address: INSA, Addis Ababa, Ethiopia</p>
            <p>
              <FaEnvelope className="email-icon" /> info@example.com
            </p>
            <p>
              <FaPhone className="phone-icon" /> +1234567890
            </p>
          </div>
          <div className="link-container">
            <p>
              <a href="/services">Services</a> | <a href="/contact">Contact</a>{" "}
              | <a href="/about">About</a> | © Copy Right Policy
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
