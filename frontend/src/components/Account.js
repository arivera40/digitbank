import React from "react";

import { AccountStyle } from "../styles/AccountStyle";

function Account({ account }) {
  const formattedBalance = account.balance.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <AccountStyle>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">TOTAL {account.accountType}</h5>
          <p className="card-text">{formattedBalance}</p>
          <p>Available balance</p>
        </div>
      </div>
    </AccountStyle>
  );
}

export default Account;
