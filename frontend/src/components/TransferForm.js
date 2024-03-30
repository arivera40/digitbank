import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FormStyle } from "../styles/FormStyle";

function TransferForm({ onTransfer, accounts }) {
  const [fromAccountSelected, setFromAccountSelected] = useState(false);
  const [filteredAccounts, setFilteredAccounts] = useState(accounts);

  const schema = yup.object().shape({
    fromAccount: yup
      .string()
      .required("Please select an account to deduct from"),
    toAccount: yup.string().required("Please select an account to transfer to"),
    amount: yup.string().required("Please enter an amount to transfer"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitTransfer = (data) => {
    onTransfer(
      accounts[data.fromAccount],
      filteredAccounts[data.toAccount],
      data.amount
    );
  };

  const handleFromAccountChange = (event) => {
    // Get the index of the selected account
    const selectedAccountIndex = event.target.value;
    setFromAccountSelected(selectedAccountIndex !== "");

    // Filter out the selected account from the accounts list
    const filteredAccounts = accounts.filter((_, index) => index !== parseInt(selectedAccountIndex));

    // Update the toAccount dropdown options
    setFilteredAccounts(filteredAccounts);
  };

  return (
    <FormStyle>
      <div className="row justify-content-center">
        <div className="col-4 mt-3">
          <form onSubmit={handleSubmit(onSubmitTransfer)}>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="fromAccount">
                From Account
              </label>
              <select
                className="form-control"
                defaultValue=""
                {...register("fromAccount", {
                  onChange: (e) => {
                    handleFromAccountChange(e);
                  },
                })}
              >
                <option value="">Choose an account</option>
                {accounts.map((account, index) => (
                  <option key={index} value={index}>
                    {account.accountType}
                  </option>
                ))}
              </select>
              {errors.fromAccount && (
                <p className="error">{errors.fromAccount.message}</p>
              )}
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="toAccount">
                To Account
              </label>
              <select
                className="form-control"
                defaultValue=""
                disabled={!fromAccountSelected}
                {...register("toAccount")}
              >
                <option value="">Choose an account</option>
                {filteredAccounts.map((account, index) => (
                  <option key={index} value={index}>
                    {account.accountType}
                  </option>
                ))}
              </select>
              {errors.toAccount && (
                <p className="error">{errors.toAccount.message}</p>
              )}
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="amount">
                Amount
              </label>
              <input
                type="text"
                className="form-control"
                {...register("amount")}
              />
              {errors.amount && (
                <p className="error">{errors.amount.message}</p>
              )}
            </div>
            <button type="submit" className="btn btn-primary btn-block mb-4">
              Transfer
            </button>
          </form>
        </div>
      </div>
    </FormStyle>
  );
}

export default TransferForm;
