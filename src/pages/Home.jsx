import MapImg from "../assets/map.jpg";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Footer from "../components/Footer"
import Properties from "../components/Properties";
import "../styles/Home.css";
const Home = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What happens if my property is damaged by a guest?",
      answer:
        "Property owners can request damage deposits from guests. Deposits help cover any potential damage caused by a guest, offering some reassurance that your property will be treated respectfully. If anything goes wrong, it can be reported to our team through our misconduct reporting feature.",
    },
    {
      question: "When will my property go online?",
      answer:
        "Once you’ve finished creating your listing, you can open your property for bookings on our site. We may ask you to verify your property before you can start accepting bookings, but you can use this time to get familiar with our extranet and get prepared for your first guests.",
    },
  ];

  return (
    <div>
      <div className="hero ">
        {/* Left Side - Investment Info */}
        <div className="hero-content">
          <h1>Real Estate Investment Opportunities Designed For You</h1>
          <p>A National Mortgage and Sales Brokerage Since 1995</p>
          <div className="hero-buttons">
            <button className="btn primary">Current Opportunities</button>
            <button className="btn secondary">
              Learn More About Investing
            </button>
          </div>
        </div>

        {/* Right Side - Registration Box */}
        <div className="regTextBox">
          <div className="register-box">
            <h2>Register for free</h2>
            <p>45% of hosts get their first booking within a week.</p>
            <p>
              Choose between instant bookings and booking requests. <br />
              We{"'"}ll facidivtate payments for you.
            </p>
            <button className="primary-btn">Get started now</button>
            <p className="subtext">Already started a registration?</p>
            <button className="secondary-btn">
              Continue your registration
            </button>
          </div>
        </div>
      </div>
      <div className="featContainer">
        <h2 className="featTitle">
          Buy, Sell, or Rent with Confidence on HomeLet
        </h2>
        <div className="features-list">
          <div className="firstFlex">
            <div>
              <div className="spanFlex">
                <span className="icon">✓</span>
                <h3> Secure Property divstings</h3>
              </div>

              <p>
                st your property with confidence—whether seldivng, renting, or
                leasing, we provide a trusted platform.
              </p>
            </div>
            <div>
              <div className="spanFlex">
                <span className="icon">✓</span>
                <h3> Set Your Own Terms</h3>
              </div>

              <p>
                Define your pricing, rental conditions, and podivcies—buyers and
                renters must agree before proceeding.
              </p>
            </div>
            <div>
              <div className="spanFlex">
                <span className="icon">✓</span>
                <h3> Flexible Deal Management</h3>
              </div>

              <p>
                Choose between instant offers or reviewing inquiries before
                accepting deals.
              </p>
            </div>
            <div>
              <div className="spanFlex">
                <span className="icon">✓</span>
                <h3> Damage & divabidivty Protection</h3>
              </div>

              <p>
                Enjoy coverage against potential property damages and
                divabidivty claims.
              </p>
            </div>
          </div>

          <div className="secondFlex">
            <div>
              <div className="spanFlex">
                <span className="icon">✓</span>
                <h3> Secure Payments & Guaranteed Transactions</h3>
              </div>

              <p>
                Receive timely payouts with fraud protection through HomeLet’s
                secure payment system.
              </p>
            </div>
            <div>
              <div className="spanFlex">
                <span className="icon">✓</span>
                <h3> Verified Buyers & Renters</h3>
              </div>

              <p>
                We verify users details, including identity and payment methods,
                ensuring a safe marketplace.
              </p>
            </div>
            <div>
              <div className="spanFlex">
                <span className="icon">✓</span>
                <h3> 24/7 Support & Easy Property Management</h3>
              </div>

              <p>
                Access multidivngual support and manage your divstings
                effortlessly through the HomeLet app.
              </p>
            </div>
          </div>
        </div>
        <div className="button-container">
          <button className="cta-button">Get Started with HomeLet</button>
        </div>
      </div>
      <div className="standOut">
        <h1> Stand out from the start</h1>
        <div className="startDiv">
          <div className="startDiv1">
            <h2> Import your reviews</h2>
            <p>
              We import your review score from other platforms and display it on
              your Booking.com property page, so you don’t start at zero
              reviews.
            </p>
          </div>
          <div className="startDiv1">
            <h2>Import your property details</h2>
            <p>
              Seamlessly import your property details and sync your availability
              calendar with other platforms to make it easy to list and avoid
              double bookings.
            </p>
          </div>
          <div className="startDiv1">
            <h2>Stand out in the market </h2>
            <p>
              The ‘New to HomeLet.com’ label helps you stand out in our search
              results.
            </p>
          </div>
        </div>
        <button type="submit" className="importBtn">
          Import your listing
        </button>
      </div>
      <div className="image-wrapper">
        <img src={MapImg} alt="Image" />
        <div className="standOut content-overlay">
          <h1> Reach a unique global customer base</h1>
          <div className="startDiv reachDiv">
            <div className="mainReach">
              <div className="reachtDiv1">
                <h2> 2/3</h2>
                <p>of holiday rental guests return to book with us again.</p>
              </div>
              <div className="reachDiv1">
                <h2>48%</h2>
                <p>
                  of nights booked by travellers at the end of 2023 were for
                  international stays.
                </p>
              </div>
            </div>

            <div className="mainReach">
              <div className="reachDiv1">
                <h2>33% </h2>
                <p>
                  of holiday rental customers are at Genius Level 2 or 3. These
                  travellers tend to spend more and book directly on our
                  platform.
                </p>
              </div>
              <div className="reachDiv1">
                <h2>30%</h2>
                <p>
                  of all nights booked on our platform were at a holiday rental.
                  More and more travellers flex book both hotels and alternative
                  accommodation.
                </p>
              </div>
            </div>
          </div>
          <button type="submit" className="importBtn">
            Grow your customer base
          </button>
        </div>
      </div>
      <Properties />
      <div className="faq-container">
        <h1>Your questions answered</h1>
        <div className="faq-item-cont">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button
              className="faq-question"
              onClick={() => toggleAnswer(index)}
            >
              <span>{faq.question}</span>
              <FaChevronDown
                className={`dropdown-icon ${openIndex === index ? "open" : ""}`}
              />
            </button>
            {openIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
        </div>
       
        <p className="faq-footer">
          Still have questions? Find answers to all your questions on our FAQ
        </p>
        <p className="faq-start">Start welcoming guests</p>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
