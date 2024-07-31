import "./Main.scss";
import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "../components/Layout/Layout";
import Login from "./auth-pages/Login";
import ForgotPassword from "./auth-pages/ForgotPassword";
import ResetPassword from "./auth-pages/ResetPassword";

import Page404 from "./Page404";

import Dashboard from "./Dashboard/Dashboard";
import Profile from "./Profile/Profile";

import { useSelector } from "react-redux";

const Main = ({ navigation }) => {
  const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <Layout navigation={navigation}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </Layout>
  );
};

export default Main;
