import React, { useState } from "react";

import { request, setAuthHeader } from "../axios_helper";

import HomeContent from "./HomeContent";
import NavigationMenu from "./NavigationMenu";
import AuthForm from "./AuthForm";

function AppContent() {
  const [componentToShow, setComponentToShow] = useState("login");

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

  return (
    <>
      {componentToShow === "login" && (
        <AuthForm onLogin={loginHandler} onRegister={registerHandler} />
      )}
      {componentToShow === "home" && (
        <>
          <NavigationMenu />
          <HomeContent />
        </>
      )}
    </>
  );
}

export default AppContent;
