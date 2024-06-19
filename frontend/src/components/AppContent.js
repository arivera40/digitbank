import React, { useState, useEffect } from "react";

import { request, setAuthHeader } from "../axios_helper";

import HomeContent from "./HomeContent";
import NavigationMenu from "./NavigationMenu";
import AuthForm from "./AuthForm";
import AccountContent from "./AccountContent";
import DepositForm from "./DepositForm";
import WithdrawForm from "./WithdrawForm";
import TransferForm from "./TransferForm";
import ZelleContent from "./ZelleContent";
import ContactForm from "./ContactForm";
import TransactionContent from "./TransactionContent";

function AppContent() {
  const [componentToShow, setComponentToShow] = useState("login");
  const [accounts, setAccounts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [accountId, setAccountId] = useState(null);
  const [contact, setContact] = useState(null);

  useEffect(() => {
    if (componentToShow === "home") {
      fetchAccountData();
      fetchContactData();
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

  // Creates Zelle contact in users contact list.
  const contactCreateHandler = (contactName, email, phoneNumber) => {
    request("POST", "/bank/createContact", {
      contactName: contactName,
      email: email,
      phoneNumber: phoneNumber
    })
      .then((response) => {
        console.log("Create Contact: Success");
        setComponentToShow("zelle");
      })
      .catch((error) => {
        console.log("Create Contact: Fail");
        console.error("Error creating Zelle contact:", error);
      });
  };

  const contactUpdateHandler = (contactId, contactName, email, phoneNumber) => {
    request("POST", "/bank/updateContact", {
      contactId: contactId,
      contactName: contactName,
      email: email,
      phoneNumber: phoneNumber
    })
      .then((response) => {
        console.log("Update Contact: Success");
        setComponentToShow("zelle");
      })
      .catch((error) => {
        console.log("Update Contact: Fail");
        console.error("Error updating Zelle contact:", error);
      })
  }

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

  // Fetch user contacts using JWT token.
  const fetchContactData = () => {
    request("GET", "/bank/getContacts")
      .then((response) => {
        console.log("Fetch contacts: Success");
        console.log(response.data);

        setContacts(response.data);
      })
      .catch((error) => {
        console.log("Fetch contacts: Fail");
        console.error("Error fetching account data:", error);
      })
  }

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
  const navigationHandler = (navSelection) => {
    console.log("Hello world");
    setComponentToShow(navSelection);
  };

  const setContactSwitchComponent = (selectedContact, newComponentToShow) => {
    console.log(selectedContact);
    console.log(newComponentToShow);
    setContact(selectedContact);
    setComponentToShow(newComponentToShow);
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
            <ZelleContent onNavItemClick={setContactSwitchComponent} contacts={contacts} />
          )}
          {componentToShow === "addContact" && (
            <ContactForm contact={null} onContactCreate={contactCreateHandler} />
          )}
          {componentToShow === "editContact" && (
            <ContactForm contact={contact} onContactCreate={contactCreateHandler} />
          )}
          {/* {componentToShow === "zelleTransfer" && (
            <ContactForm contact={contact} onContactCreate={contactCreateHandler} />
          )} */}
        </>
      )}
    </>
  );
}

export default AppContent;
