import React, { useEffect, useState } from "react";
import "../../design/signIn/index.css";
import SignUp from "../../components/signIn/SignUp";
import SignIn from "../../components/signIn/SignIn";
import { getToken } from "../../utils/localStorages";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = new useNavigate();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [loginInfo, setLoginInfo] = useState({ email: null, password: null });
  useEffect(() => {
    if (getToken()) navigate("/searchCountries");
  });
  const signeInAfterSignUp = (signUpData) => {
    setLoginInfo(signUpData ?? loginInfo);
    setIsLoginForm(true);
  };
  return (
    <div className={"main-div-login"}>
      {isLoginForm ? (
        <SignIn setIsLoginForm={setIsLoginForm} loginInfo={loginInfo} />
      ) : (
        <SignUp setIsLoginForm={signeInAfterSignUp} />
      )}
    </div>
  );
};

export default LogIn;
