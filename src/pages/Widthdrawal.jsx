import React from "react";

function Withdrawal({ handleModalswitch }) {
  return (
    <div className="depositContainerBody">
      <span
        className="closeDepositModal"
        onClick={handleModalswitch}
        id="closeWithdrawal">
        x
      </span>
      {/* there is no css to expand the modal cause i didn't create the css file for withdrawal yet and my pc z about to die  */}
      {/* and (depositContainerBody) is a fit-contenet width, so click the widthdraw itself to exit  */}
      Withdrawal
    </div>
  );
}

export default Withdrawal;
