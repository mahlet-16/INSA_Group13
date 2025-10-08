import "./Choose.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faFingerprint,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";

const Choose = () => {
  return (
    <section className="choose">
      <h1>Why Choose Us</h1>
      <div className="choose-container">
        <div className="chosen">
          <FontAwesomeIcon icon={faLock} className="mission-icon" />
          <h3>Secure by Design</h3>
          <p>
            We prioritize data protection with advanced encryption and
            authentication to keep user information safe.
          </p>
        </div>
        <div className="chosen">
          <FontAwesomeIcon icon={faFingerprint} className="mission-icon" />
          <h3>Instant Verification</h3>
          <p>
            Seamless National ID integration provides real-time, accurate
            identity verification for all users.
          </p>
        </div>
        <div className="chosen">
          <FontAwesomeIcon icon={faCogs} className="mission-icon" />
          <h3>Effortless Management</h3>
          <p>
            Simplified dashboards and tools make user management easy,
            efficient, and reliable for administrators.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Choose;
