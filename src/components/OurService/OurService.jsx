import React from "react";
import "./OurService.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import client1 from "../../Assets/images/client1.png";
import client2 from "../../Assets/images/client2.png";
import client3 from "../../Assets/images/client3.png";
function OurService() {
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
              <img className="client-image" src={client1} alt="client1" />
              <p>John Miller</p>
              <span className="job">CTO, InnovateTech</span>
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
              <div>
                {" "}
                <img className="client-image" src={client2} alt="client2" />
                <p>Stuart Robson</p>
                <span className="job">Head of Operations, FastTrack</span>
              </div>
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
              <div className="client-name">
                <img className="client-image" src={client3} alt="client3" />
                <p> Emily Green</p>
                <span className="job">UX Designer, Nova Digital.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurService;
