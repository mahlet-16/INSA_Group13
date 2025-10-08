import "./ContactInfo.css"; // optional for styling

const ContactInfo = () => {
  return (
    <section className="contact-info">
      <div className="contact-container">
        {/* Left Side */}
        <div className="contact-content">
          <div className="contact-table1">
            {/* Heading (one column full width) */}
            <h2 className="heading">Contact</h2>

            {/* Row 1 */}
            <div className="row">
              <div className="col">
                <strong>Address:</strong>
              </div>
              <div className="col">
                Grand Palace Parking, Menelik II Avenue 2nd floor, office
                number-23 Addis Ababa Ethiopia.
              </div>
            </div>

            {/* Row 2 */}
            <div className="row">
              <div className="col">
                <strong>Phone:</strong>
              </div>
              <div className="col">+251 113 720 006</div>
            </div>

            {/* Row 3 */}
            <div className="row">
              <div className="col">
                <strong>Email:</strong>
              </div>
              <div className="col">info@id.gov.et</div>
            </div>
          </div>

          <div className="contact-table2">
            {/* Heading (one column full width) */}
            <h2 className="heading">Working Hours</h2>

            {/* Row 1 */}
            <div className="row">
              <div className="col">
                <strong>Monday:</strong>
              </div>
              <div className="col"> 8:30 AM – 5:30 PM</div>
            </div>

            {/* Row 2 */}
            <div className="row">
              <div className="col">
                <strong>Tuesday:</strong>
              </div>
              <div className="col"> 8:30 AM – 5:30 PM</div>
            </div>

            {/* Row 3 */}
            <div className="row">
              <div className="col">
                <strong>Wednesday:</strong>
              </div>
              <div className="col"> 8:30 AM – 5:30 PM</div>
            </div>

            {/* Row 4 */}
            <div className="row">
              <div className="col">
                <strong>Thursday:</strong>
              </div>
              <div className="col"> 8:30 AM – 5:30 PM</div>
            </div>

            <div className="row">
              <div className="col">
                <strong>Friday:</strong>
              </div>
              <div className="col"> 8:30 AM – 5:30 PM</div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="contact-form1">
          <h2 className="get-heading">Get in touch with us</h2>
          <p className="get-desc">
            For any questions or comments feel free to contact us here
          </p>

          <form>
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input
                className="form-in"
                type="text"
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Your Email<span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="form-in"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Your Message<span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                className="form-in"
                placeholder="Enter your message"
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
