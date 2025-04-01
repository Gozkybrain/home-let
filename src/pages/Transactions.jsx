import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import "../styles/Transactions.css";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const transactionsRef = collection(db, "transactions");
    const q = query(transactionsRef, where("userId", "==", user.uid));

    // Real-time listener
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const transactionsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTransactions(transactionsList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1 className="transactionHTag">Transactions</h1>
      {loading ? (
        <p>Loading transactions...</p>
      ) : transactions.length > 0 ? (
        <div className="table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Type</th>
                <th className="pc">Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>
                    {/* Check if tx.timestamp exists before trying to access seconds */}
                    {tx.timestamp
                      ? new Date(tx.timestamp.seconds * 1000).toLocaleTimeString()
                      : "N/A"}
                  </td>
                  <td>Credit</td>
                  <td className="pc">{tx.status}</td>
                  <td>₦ {tx.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No transactions have been made yet.</p>
      )}
    </div>
  );
}

export default Transactions;
