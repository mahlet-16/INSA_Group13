import React from 'react';
import './Footer.css';
import { FaLinkedin, FaTelegramPlane, FaWhatsapp, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div>© 2025 Emamu Tech Solutions. All Rights Reserved.</div>
      <div className="footer-links">
        <a href="#" target="_blank" rel="noopener noreferrer">
          <FaLinkedin /> LinkedIn
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <FaTelegramPlane /> Telegram
        </a>
        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp /> WhatsApp
        </a>
        <a href="mailto:temesgenabdissa2@gmail.com" target="_blank" rel="noopener noreferrer">
          <FaEnvelope /> Gmail
        </a>
      </div>
    </footer>
  );
}

export default Footer;