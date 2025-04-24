import React, { useState, useEffect } from "react";
import { PaystackButton } from "react-paystack";
import {
  doc,
  onSnapshot,
  updateDoc,
  getDoc,
  addDoc,
  collection,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import Transactions from "./Transactions";
import "../styles/Deposit.css";
import { Line } from "react-chartjs-2"; // Import Chart.js component
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

// Register necessary react Chart.js elements
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function Deposit() {
  const publicKey = "pk_test_f0190a4895e6aa1d75d8f0d8aaab22bceecf0931"; //My own paystack public key

  // State to manage form inputs
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  // State to track user balance and balance history
  const [balance, setBalance] = useState(0);
  const [balanceHistory, setBalanceHistory] = useState([]); // Stores balance changes

  // Fetch user's balance in real-time from Firestore
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    //  realvtime listener for balance updates
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const newBalance = docSnap.data().balance || 0;
        setBalance(newBalance);

        // Update balance history for the graph
        setBalanceHistory((prev) => [...prev, newBalance]);
      }
    });

    return () => unsubscribe(); // Cleanup listener when component unmounts
  }, []);

  // Handle successful deposit
  const handleSuccess = async (response) => {
    const user = auth.currentUser;
    if (!user) {
      setMessage("User not authenticated");
      return;
    }

    const userId = user.uid;
    const depositAmount = parseFloat(amount); // Convert input to number

    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const currentBalance = userSnap.data().balance || 0;
        const newBalance = currentBalance + depositAmount;

        // Update balance in Firestore
        await updateDoc(userRef, { balance: newBalance });

        // Add transaction record
        await addDoc(collection(db, "transactions"), {
          userId,
          name,
          amount: depositAmount,
          timestamp: Timestamp.now(),
          status: "successful",
        });

        setMessage("Deposit successful!");

        // clearing inputs and time out for message after success
        setName("");
        setAmount("");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      } else {
        setMessage("User data not found.");
        // clearing inputs and time out for message after unauth
        setName("");
        setAmount("");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating balance:", error);
      setMessage("Transaction failed. Please try again.");
      // clearing inputs and time out for message after failiure
      setName("");
      setAmount("");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  // Paystack payment configuration
  const handleDeposit = {
    email: auth.currentUser?.email || "jondoe@example.com",
    amount: amount * 100,
    publicKey,
    text: "Deposit",
    onSuccess: handleSuccess,
    onClose: () => setMessage("Transaction closed"),
  };

  // Chart.js data for the balance graph
  const balanceData = {
    labels: balanceHistory.map((_, index) => `Deposit ${index + 1}`), // X-axis labels
    datasets: [
      {
        label: "Balance Over Time",
        data: balanceHistory, // Y-axis data
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="depositContainerBody">
      <div className="depositContainer">
        {/* Deposit Form */}
        <section className="deposit-Sub">
          <div className="depositSub">
            {" "}
            <h1 className=" transactionHTag">Transactions</h1>
            <div className=" deposit-Subb">
              {/* Transaction name */}
              {/* <section className="ttt">
                <input
                  required
                  type="text"
                  id="title"
                  placeholder="Name"
                  className="transactionFormInput"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </section> */}
              {/* Transaction amount */}
              <section className="ttt">
                <input
                  required
                  type="number"
                  id="title"
                  placeholder="Amount"
                  className="transactionFormInput"
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                />
              </section>
            </div>
            <PaystackButton
              {...handleDeposit}
              className="depositSubmitButton"
              paymentMethod={["bank", "ussd"]}
            />
            {message && <p>{message}</p>}
          </div>

          {/* Balance Display */}
          <div className="depositSub">
            <h1 className="transactionHTag">Balance</h1>
            <p>₦{balance.toFixed(2)}</p> {/* Show balance in Nigerian Naira */}
            {/* Balance Graph */}
            <div style={{ width: "100%" }}>
              <Line data={balanceData} />
            </div>
          </div>
        </section>

        {/* Transactions Section */}
        <section className="depositSubT">
          <Transactions />
        </section>
      </div>
    </div>
  );
}

export default Deposit;
