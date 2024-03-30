import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FormStyle } from "../styles/FormStyle";

function DepositForm({ onDeposit, accounts }) {
  const schema = yup.object().shape({
    account: yup.string().required("Please select an account"),
    amount: yup.string().required("Please enter an amount to deposit"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitDeposit = (data) => {
    onDeposit(accounts[data.account], data.amount);
  };

  return (
    <FormStyle>
      <div className="row justify-content-center">
        <div className="col-4 mt-3">
          <form onSubmit={handleSubmit(onSubmitDeposit)}>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="account">
                Account
              </label>
              <select
                className="form-control"
                defaultValue=""
                {...register("account")}
              >
                <option value="">Choose an account</option>
                {accounts.map((account, index) => (
                  <option key={index} value={index}>
                    {account.accountType}
                  </option>
                ))}
              </select>
              {errors.account && (
                <p className="error">{errors.account.message}</p>
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
              Deposit
            </button>
          </form>
        </div>
      </div>
    </FormStyle>
  );
}

export default DepositForm;
