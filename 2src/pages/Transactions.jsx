import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import moment from "moment";
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
      const transactionOrder = transactionsList
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 6);
      setTransactions(transactionOrder);
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
                <th className="pc">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>
                    {/* Check if tx.timestamp exists before trying to access seconds */}
                    {tx.timestamp
                      ? moment(tx.timestamp.toDate()).format(
                          "MMM Do YYYY, h:mm:ss a"
                        ) // Format using moment.js
                      : "N/A"}
                  </td>

                  <td>Deposit</td>
                  <td className="pc">
                    ₦ {new Intl.NumberFormat().format(tx.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="view-all">View Transactions</button>
        </div>
      ) : (
        <p>No transactions have been made yet.</p>
      )}
    </div>
  );
}

export default Transactions;
