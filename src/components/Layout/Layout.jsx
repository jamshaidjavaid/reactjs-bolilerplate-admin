import React from "react";

import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

import "./Layout.scss";
import Topbar from "./Topbar";

const Layout = ({ navigation, children }) => {
  return (
    <div className="layout-container">
      <Sidebar navigation={navigation} />
      <main>
        <Topbar navigation={navigation} />
        <div className="outlet-main-container">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
