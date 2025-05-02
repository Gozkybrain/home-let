// import React from "react";
import "../styles/Contact.css";
import contactBg from "../assets/image6.jpg";
import contactLogo from "../assets/home-let-green.png";
const Contact = () => {
  return (
    <div className="contact-page">
      {/* Contact Details and Map Section */}
      <div className="contact-details-map">
        <div className="contact-details">
          <div className="contactImg">
            <img src={contactLogo} alt="" />
          </div>
          <h2>Our Contact Information</h2>
          <p>
            <strong>Email:</strong> support@homelet.com
          </p>
          <p>
            <strong>Phone:</strong> +234 812 345 6789
          </p>
          <p>
            <strong>Location:</strong> 123 HomeLet Avenue, Owerri, Imo State,
            Nigeria
          </p>
        </div>
        <div className="map-container">
          <h2>Our Location</h2>
          <iframe
            title="Owerri Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1980.7636032730145!2d7.0390325!3d5.4851914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10425879d1d1b03f%3A0x576bee78df5d0b5d!2sOwerri%20Municipal%20Imo%20State!5e0!3m2!1sen!2sng!4v1697020202090!5m2!1sen!2sng"
            width="100%"
            height="300"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="sendDetails">
        <div className="contact-form-section">
          <h1 className="contact-title">Contact HomeLet</h1>
          <p className="contact-description">
            Have questions or need assistance? Reach out to us, and our team
            will be happy to help you with real estate or short-term
            accommodation inquiries.
          </p>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Jane Doe"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="jane.doe@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="123-456-7890"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select id="subject" name="subject" required>
                <option value="">Select a Subject</option>
                <option value="property-inquiry">Property Inquiry</option>
                <option value="booking-help">Booking Assistance</option>
                <option value="general-feedback">General Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Your message here..."
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
        <div className="contactImg">
          <img src={contactBg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
