import { useState, useEffect } from "react";
import "../styles/Settings.css";
import VendorImg from "../assets/vendorImg.jpg";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../lib/firebase";

const Settings = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;

  // Load data from localStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("vendorData"));
    if (savedData) {
      setFullName(savedData.fullName);
      setEmail(savedData.email);
      setBusinessName(savedData.businessName);
      setBusinessDescription(savedData.businessDescription);
      setPhone(savedData.phone);
      setLocation(savedData.location);
      setSubmitted(savedData.submitted || false);
    }
  }, []);

  // Fetch data from Firestore if user exists
  useEffect(() => {
    const fetchVendorData = async () => {
      if (user) {
        const vendorDocRef = doc(db, "vendors", user.email);
        try {
          const vendorDoc = await getDoc(vendorDocRef);
          if (vendorDoc.exists()) {
            const data = vendorDoc.data();
            setFullName(data.fullName);
            setEmail(data.email);
            setBusinessName(data.businessName);
            setBusinessDescription(data.businessDescription);
            setPhone(data.phone);
            setLocation(data.location);
            setSubmitted(true);
            localStorage.setItem(
              "vendorData",
              JSON.stringify({ ...data, submitted: true })
            );
          }
        } catch (err) {
          console.error("Error fetching vendor data:", err.message);
        }
      }
    };

    fetchVendorData();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to submit a vendor request.");
      return;
    }

    const vendorData = {
      fullName,
      email,
      phone,
      businessName,
      businessDescription,
      location,
      uid: user.uid,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const vendorDocRef = doc(db, "vendors", email);
      await setDoc(vendorDocRef, vendorData);
      setSubmitted(true);
      localStorage.setItem(
        "vendorData",
        JSON.stringify({ ...vendorData, submitted: true })
      );
      console.log("Vendor details saved successfully!");
    } catch (error) {
      console.error("Error saving vendor details:", error.message);
      setError("Failed to submit your request. Please try again.");
    }
  };

  return (
    <div className="settings">
      <div className="settings-info">
        <h2>Settings</h2>
      </div>

      <div className="settings-container">
        <div className="settings-img">
          <img src={VendorImg} alt="Vendor" />
        </div>
        <section className="vendor-request-section">
          {submitted ? (
            <div>

              <div className="submitted-details">
                <p>Full Name: {fullName}</p>
                <p>Email: {email}</p>
                <p>Phone: {phone}</p>
                <p>Business Name: {businessName}</p>
                <p>Business Description: {businessDescription}</p>
                <p>Location: {location}</p>
                <p>Status:  <strong>
                  Request submitted successfully  and is
                  pending approval.
                </strong>
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="vendor-request-form">
              <h3>Request to Become a Vendor</h3>

              {error && <p className="error-message">{error}</p>}

              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="businessName">Business Name</label>
                <input
                  type="text"
                  id="businessName"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="businessDescription">
                  Business Description
                </label>
                <textarea
                  id="businessDescription"
                  value={businessDescription}
                  onChange={(e) => setBusinessDescription(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="submit-button">
                Submit Request
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};

export default Settings;
