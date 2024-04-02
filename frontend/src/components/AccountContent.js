import React from "react";
import Account from "./Account";
import { AccountStyle } from "../styles/AccountStyle";

function AccountContent({ accounts, getTransactions }) {

  const handleAccountClick = (accountId) => {
    console.log(accountId);
    getTransactions(accountId);
  }

  return (
    <AccountStyle>
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6">
          <ul
            className="nav nav-pills nav-justified mb-3"
            id="ex1"
            role="tablist"
          >
            {accounts.map((account, index) => (
              <li key={index} className="nav-item">
                <a
                  className="nav-link"
                  id={`account-${index}-tab`}
                  data-toggle="pill"
                  href={`#account-${index}`}
                  role="tab"
                  aria-controls={`account-${index}`}
                  aria-selected="true"
                  onClick={() => handleAccountClick(account.accountId)}
                >
                  <Account account={account} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AccountStyle>
  );
}

export default AccountContent;
