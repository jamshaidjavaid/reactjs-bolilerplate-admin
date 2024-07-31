import React from "react";

import PrimaryButton from "../../components/UI/PrimaryButton";
import { LogoImage } from "../../assets";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/admin");
  };

  return (
    <div className="auth-container">
      <img src={LogoImage} className="auth-logo" />
      <div className="auth-main-container">
        <h2>Reset password</h2>
        <div className="auth-inputs">
          <input type="password" placeholder="New password" />
          <input type="password" placeholder="Confirm password" />
        </div>
        <PrimaryButton onClick={onSubmit} className={"auth-button"}>
          Submit
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Login;
