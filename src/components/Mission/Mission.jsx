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
              To provide a seamless, secure, and reliable digital identity
              integration platform that connects the Ethiopian National ID with
              institutions, enabling faster services, stronger security, and
              improved access for citizens.
            </p>
          </div>
          <div className="mission-description">
            <FontAwesomeIcon icon={faEye} className="mission-icon" />
            <h3>Vision</h3>
            <p>
              To be Ethiopia’s leading digital identity ecosystem, creating a
              trusted foundation where every person can securely access
              government, financial, health, and educational services through
              one unified national ID.
            </p>
          </div>
          <div className="mission-description">
            <FontAwesomeIcon icon={faGem} className="mission-icon" />
            <h3>Values</h3>
            <p>
              <ul>
                <li>Security & Trust </li>
                <li>Innovation </li>
                <li>Inclusivity </li>
                <li>Reliability </li>
                <li>Collaboration</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
