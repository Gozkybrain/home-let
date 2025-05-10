import React, { useEffect, useState } from "react";
import "../../styles/MyRecent.css";

function LastProperty({ closeMenu, handleModalswitch }) {
  return (
    <div className="myRecentProductsContainer">
      <div className="profileButtonsContainer">
        <button
          onClick={handleModalswitch}
          className="profileButton"
          id="openWithdrawal">
          Withdraw
        </button>{" "}
        <button
          onClick={handleModalswitch}
          className="profileButton"
          id="openDeposit">
          Deposit
        </button>
      </div>
    </div>
  );
}

export default LastProperty;
