import React from 'react';
import './ContactPage.css';
import bgHero from './Assets/contact1.jpg';
import bgThird from './Assets/contact2.jpg';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaLinkedinIn, FaTelegramPlane, FaWhatsapp, FaYoutube } from 'react-icons/fa';

function ContactPage() {
  return (
    <main className="contact-page">
      {/* Section 1: Hero */}
      <section className="contact-hero" style={{ backgroundImage: `url(${bgHero})` }}>
        <div className="contact-hero__overlay" />
        <div className="contact-hero__inner">
          <h1 className="contact-hero__title">Get in touch<br/>with <span className="accent">Us</span></h1>
        </div>
      </section>

      {/* Section 2: Contact info + form (light) */}
      <section className="contact-split">
        <div className="contact-split__container">
          <div className="contact-split__left">
            <div className="contact-card">
              <div className="contact-card__header">Contact</div>
              <div className="contact-card__body">
                <div className="contact-card__row"><strong>Address:</strong> Grand Palace Parking, Hemelik 1 Avenue 2nd floor, office number 231 Addis Ababa Ethiopia</div>
                <div className="contact-card__row"><strong>Phone:</strong> +251 791 220 008</div>
                <div className="contact-card__row"><strong>Email:</strong> info@faydapass.et</div>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-card__header">Working Hours</div>
              <div className="contact-card__body">
                <div className="contact-hours">
                  <div><span>Monday:</span><span>08:30 AM - 5:30 PM</span></div>
                  <div><span>Tuesday:</span><span>08:30 AM - 5:30 PM</span></div>
                  <div><span>Wednesday:</span><span>08:30 AM - 5:30 PM</span></div>
                  <div><span>Thursday:</span><span>08:30 AM - 5:30 PM</span></div>
                  <div><span>Friday:</span><span>08:30 AM - 5:30 PM</span></div>
                </div>
              </div>
            </div>
          </div>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <h3 className="contact-form__title">Get in touch with us</h3>
            <p className="contact-form__subtitle">For any questions or comments feel free to contact us here</p>
            <label className="contact-input">
              <span>Your Name</span>
              <input type="text" placeholder="Your Name" required />
            </label>
            <label className="contact-input">
              <span>Your Email</span>
              <input type="email" placeholder="you@example.com" required />
            </label>
            <label className="contact-input">
              <span>Your Message</span>
              <textarea rows={6} placeholder="Write your message..." required />
            </label>
            <button className="contact-btn" type="submit">Send Message</button>
          </form>
        </div>
      </section>

      {/* Section 3: Full background with overlay form and links */}
      <section className="contact-full" style={{ backgroundImage: `url(${bgThird})` }}>
        <div className="contact-full__overlay" />
        <div className="contact-full__inner">
          <div className="contact-full__left">
            <h2 className="contact-full__title">Contact With <span className="accent">Us</span></h2>
            <p className="contact-full__subtitle">For any comments feel free to contact us here</p>
            <div className="contact-socials">
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href="#" aria-label="Telegram"><FaTelegramPlane /></a>
              <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
              <a href="#" aria-label="YouTube"><FaYoutube /></a>
            </div>
            <div className="contact-mini">
              <div className="mini-row"><FaMapMarkerAlt /> Adiss ababa — INSA</div>
              <div className="mini-row"><FaEnvelope /> info@FaydaPass</div>
              <div className="mini-row"><FaPhoneAlt /> +258 2204365</div>
            </div>
            <div className="contact-links"><span className="links-label">Links</span> <a href="#">Service</a> | <a href="#">Contact</a> | <a href="#">About us</a> | <a href="#">Copyright policy</a></div>
          </div>
          <form className="contact-full__form" onSubmit={(e) => e.preventDefault()}>
            <div className="label-row">
              <label>Name</label>
              <label>Email</label>
            </div>
            <div className="form-row">
              <input type="text" placeholder="Your name" required />
              <input type="email" placeholder="you@example.com" required />
            </div>
            <label className="message-label">Your Message</label>
            <textarea rows={6} placeholder="Write your message..." required />
            <button type="submit">Send</button>
          </form>

          <div className="contact-full__bottom">
            <div className="bottom-item"><FaMapMarkerAlt /> Adiss ababa — INSA</div>
            <div className="bottom-item"><FaEnvelope /> info@FaydaPass</div>
            <div className="bottom-item links"><span className="links-label">Links</span> <a href="#">Service</a> | <a href="#">Contact</a> | <a href="#">About us</a> | <a href="#">Copyright policy</a></div>
            <div className="bottom-item"><FaPhoneAlt /> +258 2204365</div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;


