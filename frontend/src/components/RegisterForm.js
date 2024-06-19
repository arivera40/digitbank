import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FormStyle } from "../styles/FormStyle";

function RegisterForm({ onRegister }) {
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phoneNumber: yup.string().required(),
    password: yup.string().min(4).max(20).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null])
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitRegister = (data, event) => {
    event.preventDefault();
    console.log(data);
    onRegister(
      event,
      data.firstName,
      data.lastName,
      data.email,
      data.phoneNumber,
      data.password
    );
  };

  return (
    <FormStyle>
      <form onSubmit={handleSubmit(onSubmitRegister)}>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="error">{errors.firstName.message}</p>
          )}
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="error">{errors.lastName.message}</p>
          )}
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input type="text" className="form-control" {...register("email")} />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <p className="error">{errors.phoneNumber.message}</p>
          )}
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            {...register("password")}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-3">
          Sign up
        </button>
      </form>
    </FormStyle>
  );
}

export default RegisterForm;
