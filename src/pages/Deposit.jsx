import React from "react";
import { PaystackButton } from "react-paystack";
import Transactions from "./Transactions";
import depositLogic from "../lib/depositLogic";
import { Line } from "react-chartjs-2"; // Import Chart.js component
import "../styles/Deposit.css";
import { Link } from "react-router-dom";

function Deposit() {
  const {
    handleDeposit,
    balanceData,
    balance,
    amount,
    setAmount,
    message,
    user,
  } = depositLogic();

  return (
    <div className="depositContainerBody">
      <div className="depositContainer">
        {/* Deposit Form */}
        <section className="depositFormContainer">
          <div className=" depositCard">
            {" "}
            <h1 className=" transactionHTag">Deposit</h1>
            <div className=" deposit-Subb">
              {/* Transaction amount */}
              <section className="depositInputContainer">
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
          <div className="depositCard">
            <h1 className="balannceHTag">Balance</h1>
            {/* Show balance in Nigerian Naira */}
            <p className="balannceHTag">₦ {balance.toLocaleString()}</p>{" "}
            {/* Balance Graph */}
            <div style={{ width: "100%" }}>
              <Line data={balanceData} />
            </div>
          </div>
        </section>

        {/* Transactions Section */}
        <section className="transactionCard">
          <div className="profileSectionD">
            <div className="profileInformationContainerT">
              <div>
                {" "}
                <img src={user?.profilePhotoUrl} alt="Profile" />
                <div>
                  <h5 className="balannceHTag">{user?.name}</h5>
                  <span className="transactionLabels">{user?.email}</span>
                  <span className="balannceHTag">
                    ₦ {balance.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="buttonsP">
                <Link to="/withdrawal" className="balanceSubmitButton">
                  Withdraw
                </Link>{" "}
                <Link to="/profile" className="balanceSubmitButton">
                  Profile
                </Link>
              </div>
            </div>
          </div>
          <div className="TransactionSubCard">
            <Transactions />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Deposit;
