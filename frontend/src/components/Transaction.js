import React from "react";
import { TransactionStyle } from "../styles/TransactionStyle";

function Transaction({ accountId, transaction }) {
  return (
    <TransactionStyle>
      <div className="card">
        <div className="card-body">
          {transaction.transactionType === "TRANSFER" &&
          transaction.toAccountId === accountId ? (
            <h5 className="card-title">{transaction.transactionType}: IN</h5>
          ) : transaction.transactionType === "TRANSFER" ? (
            <h5 className="card-title">{transaction.transactionType}: OUT{console.log(accountId)}</h5>
          ) : (
            <h5 className="card-title">{transaction.transactionType}</h5>
          )}
          {transaction.transactionType === "DEPOSIT" ||
          (transaction.transactionType === "TRANSFER" &&
            transaction.toAccountId === accountId) ? (
            <p className="card-text debit">${transaction.amount}</p>
          ) : (
            <p className="card-text credit">-${transaction.amount}</p>
          )}
        </div>
      </div>
    </TransactionStyle>
  );
}

export default Transaction;
