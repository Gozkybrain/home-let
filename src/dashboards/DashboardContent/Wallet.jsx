import React, { useEffect, useState } from "react";
import { db, auth } from "../../lib/firebase"; // Import your Firebase Auth
import { collection, getDocs, query, where } from "firebase/firestore";
import "../../styles/Wallet.css";
import depositLogic from "../../lib/depositLogic";

function Wallet() {
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);

  // getting balance from transaction logic, would be editing when logic for this withdrawal would be built
  const { balance } = depositLogic();
  // Get the currently logged-in user
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchTransactions = async () => {
      if (currentUser) {
        try {
          // Get transactions where userId matches the logged-in user
          const transactionsQuery = query(
            collection(db, "transactions"),
            where("userId", "==", currentUser.uid) // Access the user ID directly
          );
          const transactionSnapshot = await getDocs(transactionsQuery);

          let credit = 0;
          let debit = 0;

          transactionSnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.type === "credit") {
              credit += data.amount;
            } else if (data.type === "debit") {
              debit += data.amount;
            }
          });

          setTotalCredit(credit);
          setTotalDebit(debit);
        } catch (error) {
          console.error("Error fetching transactions:", error);
        }
      }
    };

    fetchTransactions();
  }, [currentUser]);

  return (
    <div className="walletSubContainer">
      <div className="walletBalance">
        {/* would be configured later when withdrawal has been built */}
        <h3 className="walletDigit">NGN {balance.toLocaleString()}</h3>
        <p className="walletCategory">Balance</p>
      </div>
      <div className="walletCredit">
        {/* total income direct from transactions, won't be changed later  */}
        <h3 className="walletDigit">NGN {balance.toLocaleString()}</h3>
        <p className="walletCategory">Income</p>
      </div>
      <div className="walletDebit">
        <h3 className="walletDigit">NGN {totalDebit.toFixed(2)}</h3>
        <p className="walletCategory">Expense</p>
      </div>
    </div>
  );
}

export default Wallet;
