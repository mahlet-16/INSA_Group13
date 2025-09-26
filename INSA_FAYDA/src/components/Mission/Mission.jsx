import "./Mission.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faEye, faGem } from "@fortawesome/free-solid-svg-icons";

const Mission = () => {
  return (
    <section className="mission">
      <div className="mission-background">
        <h1 className="mission-title">
          Who <span className="highlight">We</span> Are
        </h1>
        <div className="mission-content">
          <div className="mission-description">
            <FontAwesomeIcon icon={faBullseye} className="mission-icon" />
            <h3>Mission</h3>
            <p>
              To deliver fast, secure, and reliable identity verification
              solutions that empower Ethiopian institutions to protect their
              people, data, and resources with confidence.
            </p>
          </div>
          <div className="mission-description">
            <FontAwesomeIcon icon={faEye} className="mission-icon" />
            <h3>Vision</h3>
            <p>
              To deliver fast, secure, and reliable identity verification
              solutions that empower Ethiopian institutions to protect their
              people, data, and resources with confidence.
            </p>
          </div>
          <div className="mission-description">
            <FontAwesomeIcon icon={faGem} className="mission-icon" />
            <h3>Values</h3>
            <p>
              To deliver fast, secure, and reliable identity verification
              solutions that empower Ethiopian institutions to protect their
              people, data, and resources with confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
