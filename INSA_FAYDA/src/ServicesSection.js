import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import './ServicesSection.css';

function ServiceCard({ titleLine1, titleLine2, description, cta }) {
  return (
    <div className="svc-card">
      <div className="svc-card-icon">
        <FiCheckCircle size={26} />
      </div>
      <h3 className="svc-card-title">
        {titleLine1}<br />{titleLine2}
      </h3>
      <p className="svc-card-desc">{description}</p>
      <button className="svc-card-btn" type="button">{cta}</button>
    </div>
  );
}

function Testimonial({ quote, name, role }) {
  return (
    <div className="tm-card">
      <div className="tm-quote">“</div>
      <p className="tm-text">{quote}</p>
      <div className="tm-user">
        <div className="tm-avatar" aria-hidden="true" />
        <div className="tm-user-meta">
          <div className="tm-user-name">{name}</div>
          <div className="tm-user-role">{role}</div>
        </div>
      </div>
    </div>
  );
}

function ServicesSection() {
  return (
    <section className="services-section">
      <div className="services-container">
        <h2 className="services-title">Our Service</h2>

        <div className="services-grid">
          <ServiceCard
            titleLine1="Visitor"
            titleLine2="Management"
            description="Easily register and issue temporary passes for guests, contractors, and vendors while maintaining full control over their access permissions."
            cta="Manage Visitors"
          />
          <ServiceCard
            titleLine1="Incident Alerts &"
            titleLine2="Notifications"
            description="Get real-time alerts via dashboard, email, or SMS for any suspicious activity, ensuring quick response to any unauthorized event."
            cta="View Alerts"
          />
          <ServiceCard
            titleLine1="Secure Data"
            titleLine2="Integration"
            description="Seamlessly connect with your existing systems while keeping all personal and access data encrypted and compliant."
            cta="Learn More"
          />
        </div>

        <h3 className="services-subtitle">What Our Clients Said</h3>
        <div className="tm-grid">
          <Testimonial
            quote="This platform has revolutionized how we manage our projects. The intuitive interface and powerful tools allow our teams to stay organized and on track."
            name="John Miller"
            role="CTO, InnovateTech"
          />
          <Testimonial
            quote="The ability to customize workflows to our needs has been a game changer. We've significantly reduced the time spent on administrative tasks."
            name="Emily Green"
            role="UX Designer, Nova Digital"
          />
          <Testimonial
            quote="From day one, I was impressed with how user‑friendly the platform is. The learning curve was minimal, and it has drastically improved how we engage."
            name="Stuart Robson"
            role="Head of Operations, FastTrack"
          />
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;


