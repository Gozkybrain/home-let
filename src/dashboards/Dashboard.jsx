import React, { useEffect, useState } from "react";
import Wallet from "./DashboardContent/Wallet";
import MiniDash from "./MiniDash";
import Properties from "../components/Properties";
import "../styles/Dashboard.css";
import Loading from "../components/loading";
import { auth, db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import LastProperty from "./DashboardContent/LastProperty";
import Deposit from "../pages/Deposit";
import Withdrawal from "../pages/Widthdrawal";
import map from "../assets/map.png";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const userId = auth.currentUser?.uid;
  const [deposit, setDeposit] = useState(false);
  const [withdrawal, setWithdrawal] = useState(false);

  // handle modal switch
  const handleModalswitch = (e) => {
    e.preventDefault();
    // handling openning and closing Deposit/Withdrawal
    if (e.target.id === "closeDeposit" || e.target.id === "closeWithdrawal") {
      setDeposit(false);
      setWithdrawal(false);
    } else if (e.target.id === "openDeposit") {
      setDeposit(true);
      setWithdrawal(false);
    } else if (e.target.id === "openWithdrawal") {
      setDeposit(false);
      setWithdrawal(true);
    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          // Use doc() and getDoc() from Firestore to fetch user document
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (!userDoc.exists()) {
            console.log("No such user document!");
          }
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      } finally {
        setLoading(false); // Stop the loading state
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const pinPositions = [
    { top: "20%", left: "60%" },
    { top: "40%", left: "50%" },
    { top: "70%", left: "80%" },
    { top: "10%", left: "30%" },
    { top: "50%", left: "20%" },
    { top: "65%", left: "70%" },
    { top: "30%", left: "90%" },
    { top: "15%", left: "10%" },
    { top: "55%", left: "40%" },
    { top: "35%", left: "75%" },
  ];

  return (
    <div className="Vendor-Dashboard-Container">
      <div className="walletContainer">
        <Wallet />
      </div>
      <div className="first-Dashboard">
        <MiniDash />
        <div>
          {/* Check if userId is available before passing to LastProperty */}
          <LastProperty handleModalswitch={handleModalswitch} />
        </div>
        <div className="map-container">
          <img src={map} alt="World Map" className="map-image" />

          {pinPositions.map((pos, index) => (
            <div
              key={index}
              className="map-pin"
              style={{ top: pos.top, left: pos.left }}
            />
          ))}
          {/* Add more pins as needed */}
        </div>
      </div>
      <Properties />
      {/* deposit modal */}
      {deposit && (
        <section className="deposit-modal">
          <Deposit handleModalswitch={handleModalswitch} />
        </section>
      )}
      {withdrawal && (
        <section className="deposit-modal">
          <Withdrawal handleModalswitch={handleModalswitch} />
        </section>
      )}
    </div>
  );
};

export default Dashboard;
