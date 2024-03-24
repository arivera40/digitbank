import React, { useState } from "react";

import { AccountStyle } from "../styles/AccountStyle";

function Account({ account }) {
  const formattedBalance = account.balance.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <AccountStyle>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">TOTAL {account.accountType}</h5>
          <p class="card-text">{formattedBalance}</p>
          <p>Available balance</p>
        </div>
      </div>
    </AccountStyle>
  );
}

export default Account;
