import React from "react";
import Transaction from "./Transaction";
import { TransactionStyle } from "../styles/TransactionStyle";
import Accordion from "react-bootstrap/Accordion";

function TransactionContent({ accountId, transactions }) {
  // Create an object to store transactions grouped by transactionDate
  const transactionsByDate = transactions.reduce((acc, transaction) => {
    const dateKey = transaction.transactionDate.join("-"); // Convert transactionDate to a string key
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(transaction);
    return acc;
  }, {});

  return (
    <TransactionStyle>
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6">
          <Accordion alwaysOpen>
            {Object.entries(transactionsByDate).map(
              ([dateKey, transactions], index) => {
                const dateObj = new Date(dateKey);
                const formattedDate = dateObj.toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric'
                });
                return (
                  <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header>{formattedDate}</Accordion.Header>
                    <Accordion.Body>
                      <ul
                        className="nav nav-pills nav-justified mb-3"
                        id={`transactions-${dateKey}`}
                        role="tablist"
                      >
                        {transactions.map((transaction, index) => (
                          <li key={index} className="nav-item">
                            <a
                              className="nav-link"
                              id={`transaction-${dateKey}-${index}-tab`}
                              data-toggle="pill"
                              href={`#transaction-${dateKey}-${index}`}
                              role="tab"
                              aria-controls={`transaction-${dateKey}-${index}`}
                              aria-selected="true"
                            >
                              <Transaction
                                accountId={accountId}
                                transaction={transaction}
                              />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                );
              }
            )}
          </Accordion>
        </div>
      </div>
    </TransactionStyle>
  );
}

export default TransactionContent;
