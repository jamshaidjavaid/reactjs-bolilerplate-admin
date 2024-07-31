import React from "react";

import PrimaryButton from "../../components/UI/PrimaryButton";
import { LogoImage } from "../../assets";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onSubmitReset = () => {
    navigate("/admin/reset-password");
  };

  return (
    <div className="auth-container">
      <img src={LogoImage} className="auth-logo" />
      <div className="auth-main-container">
        <h2>Forgot password?</h2>
        <p>
          You'll recieve a code on your email <span>example@gmail.com</span> to
          verify you are the owner.
        </p>
        <div className="auth-inputs">
          <input type="email" placeholder="Email address" />
        </div>

        <PrimaryButton onClick={onSubmitReset} className={"auth-button"}>
          Submit
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Login;
