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
            Our platform is built with security as a top priority, utilizing
            advanced encryption and authentication methods to protect user data
            and privacy.
          </p>
        </div>
        <div className="chosen">
          <FontAwesomeIcon icon={faFingerprint} className="mission-icon" />
          <h3>Instant Verification</h3>
          <p>
            Our platform integrates seamlessly with the official National ID,
            ensuring real-time, accurate verification for all users.
          </p>
        </div>
        <div className="chosen">
          <FontAwesomeIcon icon={faCogs} className="mission-icon" />
          <h3>Effortless Management</h3>
          <p>
            Our platform simplifies user management with intuitive tools and
            dashboards, making it easy for administrators to oversee and manage
            identities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Choose;
