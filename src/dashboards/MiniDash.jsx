import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import flat from "../assets/fiat.png";
import "../styles/MiniDash.css";
// importing this css for profile
import "../styles/Dashboard.css";
import depositLogic from "../lib/depositLogic";

// Skeleton loader component
const SkeletonLoader = () => (
  <div className="dashboardContainer">
    <div className="profileSection">
      <div className="skeletonImage" />
      <div className="profileDetails">
        <div className="skeletonText skeletonName" />
        <div className="skeletonText skeletonEmail" />
        <div className="skeletonText skeletonButton" />
      </div>
    </div>
  </div>
);

function MiniDash({ closeMenu, handleModalswitch }) {
  // Accept closeMenu as a prop
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { balance } = depositLogic();
  useEffect(() => {
    const auth = getAuth();

    // handle authentication change
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            role: userData.role,
            name: userData.fullName || "Guest User",
            email: userData.email || currentUser.email,
            profilePhotoUrl:
              userData.profilePhotoUrl || currentUser.photoURL || flat,
          });
        } else {
          console.log("No user document found");
          setUser({
            name: currentUser.displayName || "Guest User",
            email: currentUser.email,
            profilePhotoUrl: flat,
          });
        }
      } else {
        setUser(null); // Clear user data if not authenticated
      }
      setLoading(false); // Update loading state
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (!user) {
    return <p>No user data available.</p>;
  }

  return (
    <div className="dashboardContainer">
      {/* profile section  */}
      <div className="profileSectionD">
        <div className="profileInformationContainerT">
          <div>
            {" "}
            <img src={user?.profilePhotoUrl} alt="Profile" className="my-dp" />
            <div>
              <h5 className="balannceHTag">@{user?.name}</h5>
              <span className="transactionLabels">{user?.email}</span>
              {/* customer privilage  */}
              <div className="role">
                {user.role === "admin" && <div>Admin</div>}
                {user.role === "vendor" && <div>Vendor</div>}
                {user.role === "customer" && <div>Customer</div>}
              </div>
            </div>
          </div>
          {/* buttons container  */}
          <div className="myRecentProductsContainer">
            <div className="profileButtonsContainer">
              <button
                onClick={handleModalswitch}
                className="profileButton"
                id="openWithdrawal">
                Withdraw
              </button>{" "}
              <button
                onClick={handleModalswitch}
                className="profileButton"
                id="openDeposit">
                Deposit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiniDash;
