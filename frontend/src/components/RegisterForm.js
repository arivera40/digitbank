import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function RegisterForm({ onRegister }) {
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phoneNumber: yup.string(),
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
      </div>
      {errors.firstName && <p>{errors.firstName.message}</p>}
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="lastName">
          Last Name
        </label>
        <input type="text" className="form-control" {...register("lastName")} />
      </div>
      {errors.lastName && <p>{errors.lastName.message}</p>}
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="email">
          Email
        </label>
        <input type="text" className="form-control" {...register("email")} />
      </div>
      {errors.email && <p>{errors.email.message}</p>}
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="phoneNumber">
          Phone Number
        </label>
        <input
          type="text"
          className="form-control"
          {...register("phoneNumber")}
        />
      </div>
      {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          {...register("password")}
        />
      </div>
      {errors.password && <p>{errors.password.message}</p>}
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          {...register("confirmPassword")}
        />
      </div>
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      <button type="submit" className="btn btn-primary btn-block mb-3">
        Sign up
      </button>
    </form>
  );
}

export default RegisterForm;
