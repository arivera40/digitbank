import React, { useState, useEffect } from "react";

import { request, setAuthHeader } from "../axios_helper";

import HomeContent from "./HomeContent";
import NavigationMenu from "./NavigationMenu";
import AuthForm from "./AuthForm";
import AccountContent from "./AccountContent";
import DepositForm from "./DepositForm";

function AppContent() {
  const [componentToShow, setComponentToShow] = useState("login");
  const [accounts, setAccounts] = useState([]);

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

        setAccounts(prevAccounts => [...prevAccounts, response.data]);
        setComponentToShow("account");

      })
      .catch((error) => {
        console.log("Create Savings: Fail");
        console.error("Error creating savings account:", error);
      })
  }

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
      })
  }

  // Fetch account data using the authenticated token.
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

  // Change component based on navigation menu item click.
  const navigationHandler = (navMenu) => {
    setComponentToShow(navMenu)
  };

  return (
    <>
      {componentToShow === "login" ? (
        <AuthForm onLogin={loginHandler} onRegister={registerHandler} />
      ) : (
        <>
          <NavigationMenu onNavItemClick={navigationHandler} />
          {componentToShow === "home" && <HomeContent createSavings={createSavingsHandler} />}
          {componentToShow === "account" && <AccountContent accounts={accounts} />}
          {componentToShow === "deposit" && <DepositForm onDeposit={depositHandler} accounts={accounts} />}
          {componentToShow === "withdraw" && <AccountContent accounts={accounts} />}
          {componentToShow === "transfer" && <AccountContent accounts={accounts} />}
          {componentToShow === "zelle" && <AccountContent accounts={accounts} />}
        </>
      )}
    </>
  );
}

export default AppContent;
