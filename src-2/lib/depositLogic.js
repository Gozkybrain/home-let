import React, { useState, useEffect } from "react";
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
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import flat from "../assets/fiat.png";

// Register necessary react Chart.js elements
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function depositLogic() {
  const publicKey = "pk_test_f0190a4895e6aa1d75d8f0d8aaab22bceecf0931"; // My own paystack public key
  // user
  const [user, setUser] = useState(null);

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

    //  real-time listener for balance updates
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
  // auth
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
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
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

        // Clearing inputs and time out for message after success
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
      // clearing inputs and time out for message after failure
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
        borderColor: "green",
        backgroundColor: "green",

        tension: 0.4,
      },
    ],
  };

  return {
    handleDeposit,
    balanceData,
    balance,
    amount,
    setAmount,
    message,
    user,
  };
}

export default depositLogic;
