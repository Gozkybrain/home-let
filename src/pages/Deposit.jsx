import React from "react";
import { PaystackButton } from "react-paystack";
import depositLogic from "../lib/depositLogic";
import "../styles/Deposit.css";
import depositImg from "../assets/depositImg.png";

function Deposit({ handleModalswitch }) {
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
      <span
        className="closeDepositModal"
        onClick={handleModalswitch}
        id="closeDeposit">
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
