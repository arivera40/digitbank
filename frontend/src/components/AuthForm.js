import React, { useState } from "react";


import classNames from "classnames";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

function AuthForm({ onLogin, onRegister }) {
  const [active, setActive] = useState("login");

  return (
    <div className="row justify-content-center">
      <div className="col-4">
        <ul
          className="nav nav-pills nav-justified mb-3"
          id="ex1"
          role="tablist"
          style={{ marginTop: "30px" }}
        >
          <li className="nav-item" role="presentation">
            <button
              className={classNames(
                "nav-link",
                active === "login" ? "active" : ""
              )}
              id="tab-login"
              onClick={() => setActive("login")}
            >
              Login
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={classNames(
                "nav-link",
                active === "register" ? "active" : ""
              )}
              id="tab-register"
              onClick={() => setActive("register")}
            >
              Register
            </button>
          </li>
        </ul>
        <div className="tab-content">
          <div
            className={classNames(
              "tab-pane",
              "fade",
              active === "login" ? "show active" : ""
            )}
            id="digitbank-login"
          >
            <LoginForm onLogin={onLogin} />
          </div>

          <div
            className={classNames(
              "tab-pane",
              "fade",
              active === "register" ? "show active" : ""
            )}
            id="digitbank-register"
          >
            <RegisterForm onRegister={onRegister} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
