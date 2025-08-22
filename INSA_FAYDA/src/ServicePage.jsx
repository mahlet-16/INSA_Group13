import React from 'react';
import './ServicePage.css';
import service1 from './Assets/service1.jpg';
import service2 from './Assets/service2.jpg';
import service3 from './Assets/service3.jpg';

function ServicePage() {
  return (
    <main className="service-page">
      {/* Section 1: Hero */}
      <section className="svc-hero" style={{ backgroundImage: `url(${service1})` }}>
        <div className="svc-hero__overlay" />
        <div className="svc-hero__inner">
          <h1 className="svc-hero__title">
            FaydaPass ID
            <br />
            <span className="svc-accent">Services</span>
          </h1>
          <div className="svc-hero__cards" aria-hidden="true">
            <div className="svc-hero__card" />
            <div className="svc-hero__card" />
            <div className="svc-hero__card" />
          </div>
        </div>
      </section>

      {/* Section 2: Reliable ID Services (light background, text left, image right) */}
      <section className="svc-what svc-what--light">
        <div className="svc-what__inner">
          <div className="svc-what__two-col">
            <div className="svc-what__content-col">
              <h2 className="svc-what__title">Reliable ID Services for Every Sector</h2>
              <p className="svc-what__desc">
                At FAYDA National ID Verification & Access Control, we deliver secure, efficient, and reliable
                access management for institutions, companies, and facilities. Fully integrated with the official
                National ID, our platform makes verification instant, accurate, and trustworthy.
              </p>
              <p className="svc-what__desc">
                Both platform and company admins can manage users, control access, and monitor activities in real time —
                whether it's a school, office, or government facility, FAYDA keeps entry simple and secure.
              </p>
            </div>
            <div className="svc-what__media" aria-hidden="true">
              <img className="svc-what__img" src={service2} alt="Reliable ID Services" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: What We Offer (two-column layout with background image on left, services on right) */}
      <section className="svc-what-we-offer" style={{ backgroundImage: `url(${service3})` }}>
        <div className="svc-what-we-offer__overlay" />
        <div className="svc-what-we-offer__container">
          <h2 className="svc-what-we-offer__title">What We Offer</h2>
          
          {/* Two-column layout */}
          <div className="svc-what-we-offer__content">
            {/* Left side - Background image with fingerprint (no additional icon) */}
            <div className="svc-what-we-offer__left-side">
              {/* Background image shows through - fingerprint is part of the image */}
            </div>
            
            {/* Right side - Numbered Service Points */}
            <div className="svc-what-we-offer__services">
              <div className="svc-what-we-offer__service-item">
                <div className="svc-what-we-offer__service-content">
                  <h3 className="svc-what-we-offer__service-title">Faster Onboarding</h3>
                  <p className="svc-what-we-offer__service-desc">Get people signed in and cleared for access in seconds, not minutes.</p>
                </div>
                <div className="svc-what-we-offer__number">1</div>
              </div>
              
              <div className="svc-what-we-offer__service-item">
                <div className="svc-what-we-offer__service-content">
                  <h3 className="svc-what-we-offer__service-title">Secure from the Start</h3>
                  <p className="svc-what-we-offer__service-desc">End‑to‑end encrypted identity checks keep your data and facilities safe.</p>
                </div>
                <div className="svc-what-we-offer__number">2</div>
              </div>
              
              <div className="svc-what-we-offer__service-item">
                <div className="svc-what-we-offer__service-content">
                  <h3 className="svc-what-we-offer__service-title">Always in Control</h3>
                  <p className="svc-what-we-offer__service-desc">Real‑time monitoring and reports so you know exactly who is inside your premises at any time.</p>
                </div>
                <div className="svc-what-we-offer__number">3</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ServicePage;


