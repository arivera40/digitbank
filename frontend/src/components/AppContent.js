import React, { useState, useEffect } from "react";

import { request, setAuthHeader } from "../axios_helper";

import HomeContent from "./HomeContent";
import NavigationMenu from "./NavigationMenu";
import AuthForm from "./AuthForm";
import AccountContent from "./AccountContent";
import DepositForm from "./DepositForm";
import WithdrawForm from "./WithdrawForm";
import TransferForm from "./TransferForm";
import TransactionContent from "./TransactionContent";

function AppContent() {
  const [componentToShow, setComponentToShow] = useState("login");
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [accountId, setAccountId] = useState(null);

  useEffect(() => {
    if (componentToShow === "home") {
      fetchAccountData();
    }
  }, [componentToShow]);

  useEffect(() => {
    console.log("Accounts obtained: ", accounts);
  }, [accounts]);

  // Login with an existing user.
  const loginHandler = (event, email, password) => {
    event.preventDefault();
    request("POST", "/login", {
      email: email,
      password: password,
    })
      .then((response) => {
        setAuthHeader(response.data.accessToken);
        setComponentToShow("home");
      })
      .catch((error) => {
        setAuthHeader(null);
      });
  };

  // Register new user.
  const registerHandler = (
    event,
    firstName,
    lastName,
    email,
    phoneNumber,
    password
  ) => {
    event.preventDefault();
    request("POST", "/register", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
    })
      .then((response) => {
        console.log(
          "Registration Successful\nResponse: " + response.data.accessToken
        );
        setAuthHeader(response.data.accessToken);
        setComponentToShow("home");
      })
      .catch((error) => {
        console.log("Registration Failed!\n Error: " + error);
        setAuthHeader(null);
        setComponentToShow("welcome");
      });
  };

  // Create savings account.
  const createSavingsHandler = () => {
    request("POST", "/bank/createSavings")
      .then((response) => {
        console.log("Create Savings: Success");
        console.log(response.data);

        setAccounts((prevAccounts) => [...prevAccounts, response.data]);
        setComponentToShow("accounts");
      })
      .catch((error) => {
        console.log("Create Savings: Fail");
        console.error("Error creating savings account:", error);
      });
  };

  // Deposit funds into an account.
  const depositHandler = (account, amount) => {
    request("POST", "/bank/deposit", {
      toAccountId: account.accountId,
      amount: amount,
    })
      .then((response) => {
        console.log("Deposit: Success");
        setComponentToShow("home");
      })
      .catch((error) => {
        console.log("Deposit: Fail");
        console.error("Error depositing funds into account:", error);
      });
  };

  // Withdraw funds into an account.
  const withdrawHandler = (account, amount) => {
    request("POST", "/bank/withdraw", {
      fromAccountId: account.accountId,
      amount: amount,
    })
      .then((response) => {
        console.log("Withdraw: Success");
        setComponentToShow("home");
      })
      .catch((error) => {
        console.log("Withdraw: Fail");
        console.error("Error withdrawing funds from account:", error);
      });
  };

  // Transfer funds into an account.
  const transferHandler = (fromAccount, toAccount, amount) => {
    request("POST", "/bank/transfer", {
      fromAccountId: fromAccount.accountId,
      toAccountId: toAccount.accountId,
      amount: amount,
    })
      .then((response) => {
        console.log("Transfer: Success");
        setComponentToShow("home");
      })
      .catch((error) => {
        console.log("Transfer: Fail");
        console.error("Error tranfering funds from/to account:", error);
      });
  };

  // Fetch user accounts using JWT token.
  const fetchAccountData = () => {
    request("GET", "/bank/getAccounts")
      .then((response) => {
        console.log("Fetch accounts: Success");
        console.log(response.data);

        setAccounts(response.data);
      })
      .catch((error) => {
        console.log("Fetch accounts: Fail");
        console.error("Error fetching account data:", error);
      });
  };

  // Fetch account transactions using account id.
  const fetchTransactionData = (accountId) => {
    request("POST", "/bank/getTransactions", {
      accountId: accountId,
    })
      .then((response) => {
        console.log("Fetch transactions: Success");
        
        setTransactions(response.data.reverse());
        setAccountId(accountId);
        console.log(transactions);
        console.log(accountId);
        setComponentToShow("transactions");
      })
      .catch((error) => {
        console.log("Fetch transactions: Fail");
        console.error("Error fetching transaction data:", error);
      })
  }

  // Change component based on navigation menu item click.
  const navigationHandler = (navMenu) => {
    setComponentToShow(navMenu);
  };

  return (
    <>
      {componentToShow === "login" ? (
        <AuthForm onLogin={loginHandler} onRegister={registerHandler} />
      ) : (
        <>
          <NavigationMenu onNavItemClick={navigationHandler} />
          {componentToShow === "home" && (
            <HomeContent createSavings={createSavingsHandler} />
          )}
          {componentToShow === "accounts" && (
            <AccountContent getTransactions={fetchTransactionData} accounts={accounts} />
          )}
          {componentToShow === "transactions" && (
            <TransactionContent accountId={accountId} transactions={transactions} />
          )}
          {componentToShow === "deposit" && (
            <DepositForm onDeposit={depositHandler} accounts={accounts} />
          )}
          {componentToShow === "withdraw" && (
            <WithdrawForm onWithdraw={withdrawHandler} accounts={accounts} />
          )}
          {componentToShow === "transfer" && (
            <TransferForm onTransfer={transferHandler} accounts={accounts} />
          )}
          {componentToShow === "zelle" && (
            <AccountContent accounts={accounts} />
          )}
        </>
      )}
    </>
  );
}

export default AppContent;
