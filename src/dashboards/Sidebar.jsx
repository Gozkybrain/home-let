import React, { useState, useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import "../styles/Sidebar.css";
import Loading from "../components/loading";

function Sidebar() {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminToggleOpen, setAdminToggleOpen] = useState(false); // New state
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUser(authUser);
        const userDocRef = doc(db, "users", authUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserRole(userData.role || null);
        } else {
          console.log("No user document found");
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" state={{ from: location }} />;

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    signOut(auth)
      .then(() => console.log("User signed out"))
      .catch((error) => console.error("Error signing out: ", error));
  };

  return (
    <div className="sidebar">
      <Link to="/" className={`routeLinks ${isActive("/") ? "active" : ""}`}>
        Dashboard
      </Link>

      {/* Admin Toggle Button */}
      {userRole === "admin" && (
        <>
          <span
            onClick={() => setAdminToggleOpen(!adminToggleOpen)}
            className="admin-toggle-button"
          >
            Admin Mode {adminToggleOpen ? "↴" : "→"}
          </span>

          {adminToggleOpen && (
            <div className="admin-links">
              <Link
                to="/users"
                className={`routeLinks ${isActive("/users") ? "active" : ""}`}
              >
                All Users
              </Link>

              <Link
                to="/new-transaction"
                className={`routeLinks ${isActive("/new-transaction") ? "active" : ""
                  }`}
              >
                Add Transactions
              </Link>
              <Link
                to="/vendor-list"
                className={`routeLinks ${isActive("/vendor-list") ? "active" : ""
                  }`}
              >
                Vendor List
              </Link>
              <Link
                to="/adminwithdrawals"
                className={`routeLinks ${isActive("/adminwithdrawals") ? "active" : ""
                  }`}
              >
                Withdrawal List
              </Link>
            </div>
          )}
        </>
      )}


      {(userRole === "admin" || userRole === "vendor") && (
        <>
          <Link
            to="/add"
            className={`routeLinks ${isActive("/add") ? "active" : ""}`}
          >
            Add Property
          </Link>
          <Link
            to="/vendor-properties"
            className={`routeLinks ${isActive("/vendor-properties") ? "active" : ""
              }`}
          >
            Created Properties
          </Link>
        </>
      )}

      <Link
        to="/deposit"
        className={`routeLinks ${isActive("/deposit") ? "active" : ""}`}
      >
        Deposit
      </Link>
      <Link
        to="/withdrawal"
        className={`routeLinks ${isActive("/withdrawal") ? "active" : ""}`}
      >
        Withdrawal
      </Link>
      <Link
        to="/inspection"
        className={`routeLinks ${isActive("/inspection") ? "active" : ""}`}
      >
        Inspection
      </Link>
      <Link
        to="/profile"
        className={`routeLinks ${isActive("/profile") ? "active" : ""}`}
      >
        Profile
      </Link>
      <Link
        to="/settings"
        className={`routeLinks ${isActive("/settings") ? "active" : ""}`}
      >
        Settings
      </Link>

      <button onClick={handleLogout} className="logout">
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
