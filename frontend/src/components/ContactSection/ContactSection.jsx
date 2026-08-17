import "./ContactSection.css";

function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">

        <div className="section-title">
          <span className="contact-tag">CONTACT US</span>

          <h2>We'd Love to Hear From You</h2>

          <p>
            Have a question, suggestion, or just want to say hello?
            Get in touch with us.
          </p>
        </div>

        <div className="contact-content">

          <div className="contact-info">

            <div className="contact-item">
              <span>📍</span>
              <div>
                <h3>Visit Us</h3>
                <p>123 Food Street, Chennai</p>
              </div>
            </div>

            <div className="contact-item">
              <span>📞</span>
              <div>
                <h3>Call Us</h3>
                <p>+91 1234567890</p>
              </div>
            </div>

            <div className="contact-item">
              <span>✉️</span>
              <div>
                <h3>Email Us</h3>
                <p>hello@foodhouse.com</p>
              </div>
            </div>

          </div>

          <form className="contact-form">

            <input
              type="text"
              placeholder="Your Name"
            />

            <input
              type="email"
              placeholder="Your Email"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
            ></textarea>

            <button type="submit">
              Send Message
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}

export default ContactSection;