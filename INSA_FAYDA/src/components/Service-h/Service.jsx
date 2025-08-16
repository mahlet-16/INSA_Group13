import React from "react";
import "./Service.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

function Service() {
  return (
    <section id="service" className="service-section">
      <div className="container">
        <h1 className="service-title  ">Our Services</h1>
        <div className="service-list">
          <div className="service-item">
            <FontAwesomeIcon icon={faCircleCheck} className="service-icon" />
            <h1>Visitor Management</h1>
            <p>
              Easily register and issue temporary passes for guests,
              contractors, and vendors while maintaining full control over their
              access permissions.
            </p>
            <button className="service-button">Manage Visitors</button>
          </div>
          <div className="service-item">
            <FontAwesomeIcon icon={faCircleCheck} className="service-icon" />
            <h1>Incident Alerts & Notifications</h1>
            <p>
              Get real–time alerts via dashboard, email, or SMS for any
              unauthorized entry attempt or unusual activity, ensuring quick
              response and enhanced security.
            </p>
            <button className="service-button">View Alerts</button>
          </div>
          <div className="service-item">
            <FontAwesomeIcon icon={faCircleCheck} className="service-icon" />
            <h1>Secure Data Integration</h1>
            <p>
              Seamlessly connect with your existing HR, school, or facility
              management systems while keeping all personal and access data
              encrypted and compliant.
            </p>
            <button className="service-button">Learn More</button>
          </div>
        </div>
        <div className="what-client-said-container">
          <h2 className="header">What Our Clients Said</h2>
          <div className="what-client-said-list">
            <div className="what-client-said">
              <FontAwesomeIcon
                icon={faQuoteLeft}
                className="service-icon-quote"
              />
              <blockquote>
                <p>
                  "This platform has revolutionized how we manage our projects.
                  The intuitive interface and powerful tools allow our teams to
                  stay organized and on track."
                </p>
              </blockquote>
            </div>
            <div className="what-client-said">
              <FontAwesomeIcon
                icon={faQuoteLeft}
                className="service-icon-quote"
              />
              <blockquote>
                <p>
                  "The ability to customize workflows to our needs has been a
                  game changer. We've significantly reduced the time spent on
                  administrative tasks."
                </p>
              </blockquote>
            </div>
            <div className="what-client-said">
              <FontAwesomeIcon
                icon={faQuoteLeft}
                className="service-icon-quote"
              />
              <blockquote>
                <p>
                  "From day one, I was impressed with how user-friendly the
                  platform is. The learning curve was minimal, and it has
                  drastically improved how we design."
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Service;
