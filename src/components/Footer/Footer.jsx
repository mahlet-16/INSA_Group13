import "./Footer.css";
import {
  FaLinkedin,
  FaTelegramPlane,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <section className="footer-section">
      <footer className="footer">
        <div>© 2025 FaydaPass. All Rights Reserved.</div>
        <div className="footer-links">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaLinkedin /> LinkedIn
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaTelegramPlane /> Telegram
          </a>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp /> WhatsApp
          </a>
          <a
            href="mailto:temesgenabdissa2@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaEnvelope /> Gmail
          </a>
        </div>
      </footer>
    </section>
  );
}

export default Footer;
