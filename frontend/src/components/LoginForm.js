import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function LoginForm({ onLogin }) {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(20).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitLogin = (data, event) => {
    event.preventDefault();
    console.log(data);
    onLogin(event, data.email, data.password)
  };

  return (
    <form onSubmit={handleSubmit(onSubmitLogin)}>
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="email">
          Email
        </label>
        <input type="text" className="form-control" {...register("email")} />
      </div>
      {errors.email && <p>{errors.email.message}</p>}
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
      <button type="submit" className="btn btn-primary btn-block mb-4">
        Sign in
      </button>
    </form>
  );
}

export default LoginForm;
