import React, { useEffect, useState } from "react";
import Wallet from "./DashboardContent/Wallet";
import MiniDash from "./MiniDash";
import Properties from "../components/Properties";
import "../styles/Dashboard.css";
import Loading from "../components/loading";
import { auth, db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import LastProperty from "./DashboardContent/LastProperty";
import useDepositLogic from "../lib/depositLogic";

import Deposit from "../pages/Deposit";
import Withdrawal from "../pages/Widthdrawal";
import map from "../assets/map.png";

const Dashboard = () => {
  const { balance } = useDepositLogic();
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



  return (
    <div className="Vendor-Dashboard-Container">
      <div className="walletContainer">
        <Wallet />
      </div>
      <div className="first-Dashboard">
        <MiniDash handleModalswitch={handleModalswitch} />
        {/* map component */}
        <div className="map-container">
          <div className="walletBalance">
            {/* would be configured later when withdrawal has been built */}
            <h3 className="walletDigit">NGN {balance.toLocaleString()}</h3>
            <p className="walletCategory">Balance</p>
          </div>
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
