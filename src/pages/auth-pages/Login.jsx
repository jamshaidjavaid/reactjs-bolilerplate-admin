import "./AuthPages.scss";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import PrimaryButton from "../../components/UI/PrimaryButton";
import { LogoImage } from "../../assets";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/slices/authSlice";
import { usePostApi } from "../../hooks/api";
import { Spin } from "antd";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const { handleMutation, isLoading } = usePostApi();

  const validateForm = () => {
    let valid = true;
    let errors = { email: "", password: "" };

    if (!formValues.email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Email is invalid";
      valid = false;
    }

    if (!formValues.password) {
      errors.password = "Password is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const onSubmitLogin = () => {
    if (validateForm()) {
      handleMutation(
        {
          path: "auth/login",
          data: formValues,
        },
        (res) => {
          // console.log(res);
          dispatch(
            login({
              user: res.data.user,
              token: res.data.tokens.access.token,
              refreshToken: res.data.tokens.refresh.token,
              tokenExpiry: res.data.tokens.access.expires,
              refreshTokenExpiry: res.data.tokens.refresh.expires,
            })
          );
          navigate("/admin");
        }
      );
    }
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const onForgotPassword = () => {
    navigate("/admin/forgot-password");
  };

  return (
    <div className="auth-container">
      <img src={LogoImage} className="auth-logo" alt="Logo" />
      <div className="auth-main-container">
        <h2>Admin Login</h2>
        <div className="auth-inputs">
          <input
            onChange={handleInputChange}
            type="email"
            placeholder="Email address"
            name="email"
            value={formValues.email}
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <input
            onChange={handleInputChange}
            type="password"
            placeholder="Password"
            name="password"
            value={formValues.password}
          />
          {errors.password && <span className="error">{errors.password}</span>}
          <h4 onClick={onForgotPassword}>Forgot password?</h4>
        </div>
        <PrimaryButton onClick={onSubmitLogin} className={"auth-button"}>
          {isLoading ? <Spin spinning={true} size="small" /> : "Login"}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Login;
