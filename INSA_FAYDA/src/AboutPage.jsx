import React from 'react';
import './AboutPage.css';
import aboutHero from './Assets/aboutpage.jpg';
import { FiLock } from 'react-icons/fi';

function AboutPage() {
  return (
    <main className="about-page">
      {/* Section 1: Who We Are */}
      <section className="about-hero" style={{ backgroundImage: `url(${aboutHero})` }}>
        <div className="about-hero__overlay" />
        <div className="about-hero__inner">
          <h1 className="about-hero__title">Who <span className="about-hero__accent">We</span> Are</h1>
          <div className="about-cards">
            <div className="about-card">
              <div className="about-card__icon" aria-hidden>💠</div>
              <h3 className="about-card__title">Mission</h3>
              <p className="about-card__text">To deliver fast, secure, and reliable identity verification solutions that empower Ethiopian institutions to protect their people, data, and resources with confidence.</p>
            </div>
            <div className="about-card">
              <div className="about-card__icon" aria-hidden>🎯</div>
              <h3 className="about-card__title">Vision</h3>
              <p className="about-card__text">To deliver fast, secure, and reliable identity verification solutions that empower Ethiopian institutions to protect their people, data, and resources with confidence.</p>
            </div>
            <div className="about-card">
              <div className="about-card__icon" aria-hidden>💎</div>
              <h3 className="about-card__title">Values</h3>
              <p className="about-card__text">To deliver fast, secure, and reliable identity verification solutions that empower Ethiopian institutions to protect their people, data, and resources with confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Why Choose Us */}
      <section className="about-why">
        <h2 className="about-why__title">Why Choose Us</h2>
        <div className="why-cards">
          <div className="why-card">
            <div className="why-card__icon-wrap" aria-hidden>
              <FiLock className="why-card__icon-svg" />
            </div>
            <h3 className="why-card__title">Secure by Design</h3>
            <p className="why-card__text">
              Built on Ethiopia’s<br/>
              official FAYDA ID<br/>
              system with top‑level<br/>
              encryption.
            </p>
          </div>
          <div className="why-card">
            <div className="why-card__icon-wrap" aria-hidden>
              <FiLock className="why-card__icon-svg" />
            </div>
            <h3 className="why-card__title">Instant Verification</h3>
            <p className="why-card__text">
              Built on Ethiopia’s<br/>
              official FAYDA ID<br/>
              system with top‑level<br/>
              encryption.
            </p>
          </div>
          <div className="why-card">
            <div className="why-card__icon-wrap" aria-hidden>
              <FiLock className="why-card__icon-svg" />
            </div>
            <h3 className="why-card__title">Effortless Management</h3>
            <p className="why-card__text">
              Built on Ethiopia’s<br/>
              official FAYDA ID<br/>
              system with top‑level<br/>
              encryption.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;


