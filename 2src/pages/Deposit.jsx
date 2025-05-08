import React from "react";
import { PaystackButton } from "react-paystack";
import Transactions from "./Transactions";
import depositLogic from "../lib/depositLogic";
import { Line } from "react-chartjs-2"; // Import Chart.js component
import "../styles/Deposit.css";
import { Link } from "react-router-dom";
import depositImg from "../assets/depositImg.png";

function Deposit({ setDeposit }) {
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
      <span className="closeDepositModal" onClick={() => setDeposit(false)}>
        x
      </span>

      <div className="depositContainer">
        {/* Deposit Form */}

        <section className="depositFormContainer">
          {/* deposit form  */}
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
                  className="depositFormInput"
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

          {/* balance  */}
          <div className="depositCard">
            <h1 className="balannceHTag">Balance</h1>
            {/* Show balance in Nigerian Naira */}
            <p className="balannceHTag">₦ {balance.toLocaleString()}</p>{" "}
          </div>
        </section>
        {/* img container  */}
        <section className="depositImgContainer">
          <img src={depositImg} alt="" className="iimg" />
        </section>
      </div>
    </div>
  );
}

export default Deposit;
