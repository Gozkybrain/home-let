import { useEffect, useState } from "react";
import { auth } from "../lib/firebase"; // Use named import
import "../styles/Footer.css";
import MobileNav from "./MobileNav";
import logo from '../assets/home-let-white.png';
const Footer = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <footer className="footer">
      {!user ? (
        <div className="pc-footer">
          <div className="footerBg">
            {/* Logo & Description */}
            <div className="footerLogo">
              <div className="footerImg">
                   <img src={logo} alt="Logo" />
              </div>
              <p>The Payments Platform Designed to Put Merchants First</p>
            </div>

            <hr />

            {/* Resources Section */}
            <div className="footerResource">
              <h2>Access</h2>
              <ul>
                <li>Register</li>
                <li>LogIn</li>
                <li>Find Property</li>
              </ul>
            </div>

            <hr />

            {/* About Us Section */}
            <div className="footerAbout">
              <h2>About Us</h2>
              <ul>
                <li>About Us</li>
                <li>Terms and Services</li>
              </ul>
            </div>

            <hr />

            {/* Contact Section */}
            <div className="footerContact">
              <h2>Contact</h2>
              <ul>
                <li>08132581551</li>
                <li>Twitter</li>
                <li>Facebook</li>
                <li>LinkedIn</li>
                <li>Instagram</li>
              </ul>
            </div>
          </div>
          <p className="footerCopy">  &copy; 2024 HomeLet. All rights reserved.</p>
        </div>
      ) : (
        <div className="mob-footer">
          <MobileNav />
        </div>
      )}
    </footer>
  );
};

export default Footer;
