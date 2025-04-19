import "../styles/Terms.css";

const Terms = () => {
  return (
    <div className="container">
      <div className="images">
        <h1 className="heading">TERMS AND CONDITIONS</h1>
      </div>
      <h2 className="subheading">HOME LET RENTALS</h2>
      <p className="lastUpdated">
        <strong>Last Updated: [Insert Date]</strong>
      </p>
      <p className="text">
        Welcome to Home Let Rentals. By using our platform to list, book, or
        manage properties, you agree to comply with the following Terms and
        Conditions. Please read them carefully before proceeding.
      </p>

      <h3 className="sectionTitle">1. Definitions</h3>
      <ul className="list">
        <li>
          <strong>{"Home Let Rentals"}</strong> refers to the online platform
          facilitating short-term and long-term property rentals.
        </li>
        <li>
          <strong>{"Host"}</strong> refers to individuals or businesses listing
          properties for rent.
        </li>
        <li>
          <strong>{"Guest"}</strong> refers to users booking accommodations
          through Home Let Rentals.
        </li>
        <li>
          <strong>{"Property"}</strong> refers to any residential or commercial
          space listed on the platform.
        </li>
        <li>
          <strong>{"Booking"}</strong> refers to the rental transaction between
          Hosts and Guests.
        </li>
      </ul>

      <h3 className="sectionTitle">2. Booking and Payments</h3>
      <ul className="list">
        <li>Guests must provide accurate information when making a booking.</li>
        <li>
          All payments are processed through secure channels and must be
          completed before check-in.
        </li>
        <li>
          Hosts may set their own cancellation and refund policies, which Guests
          must review before booking.
        </li>
        <li>
          Service fees may apply for transactions, and these will be disclosed
          before confirmation.
        </li>
      </ul>

      <h3 className="sectionTitle">3. Host Responsibilities</h3>
      <ul className="list">
        <li>
          Hosts must provide accurate descriptions, photos, and pricing for
          their properties.
        </li>
        <li>
          Hosts are responsible for ensuring their property is safe, clean, and
          meets local rental laws.
        </li>
        <li>
          Hosts must honor confirmed reservations and maintain good
          communication with Guests.
        </li>
        <li>
          Any disputes regarding property conditions or cancellations must be
          resolved through our platform.
        </li>
      </ul>

      <h3 className="sectionTitle">4. Guest Responsibilities</h3>
      <ul className="list">
        <li>
          Guests must respect the property, neighbors, and follow house rules
          set by the Host.
        </li>
        <li>
          Guests are responsible for any damages incurred during their stay and
          may be charged accordingly.
        </li>
        <li>
          Unlawful or disruptive behavior may lead to booking cancellation
          without a refund.
        </li>
        <li>Guests must check out on time to avoid additional fees.</li>
      </ul>

      <h3 className="sectionTitle">5. Cancellations and Refunds</h3>
      <ul className="list">
        <li>
          Cancellation policies vary by property; Guests should review policies
          before booking.
        </li>
        <li>
          Refunds, if applicable, will be processed within [X] business days.
        </li>
        <li>Last-minute cancellations may result in partial or no refund.</li>
        <li>
          Hosts may cancel bookings only in exceptional cases, and repeated
          cancellations may lead to account suspension.
        </li>
      </ul>

      <h3 className="sectionTitle">6. Safety and Security</h3>
      <ul className="list">
        <li>
          Home Let Rentals verifies listings but does not guarantee the safety
          of a property. Guests should conduct due diligence.
        </li>
        <li>
          All communication and payments should be made through the platform to
          ensure security.
        </li>
        <li>
          Guests and Hosts should report any suspicious activity or violations
          immediately.
        </li>
      </ul>

      <h3 className="sectionTitle">7. Dispute Resolution</h3>
      <ul className="list">
        <li>Any disputes will be first handled through our support team.</li>
        <li>If unresolved, mediation or arbitration may be required.</li>
        <li>
          Legal action will be taken in accordance with the governing laws of
          [Your Jurisdiction].
        </li>
      </ul>

      <h3 className="sectionTitle">8. Amendments to Terms</h3>
      <ul className="list">
        <li>
          Home Let Rentals reserves the right to update these Terms at any time.
        </li>
        <li>
          Users will be notified of significant changes via email or platform
          announcements.
        </li>
      </ul>

      <p className="text">
        By using Home Let Rentals, you acknowledge that you have read,
        understood, and agreed to these Terms and Conditions.
      </p>
      <p className="text">
        For any inquiries, please contact us at [Your Contact Information].
      </p>
    </div>
  );
};

export default Terms;
