import React from "react";

import Header from "./Header";

import "./Layout.scss";
import Footer from "./Footer";

const Layout = ({ navigation, children }) => {
  return (
    <div className="layout-container">
      <Header navigation={navigation} />
      <main>
        <div className="outlet-main-container">{children}</div>
      </main>
      <Footer navigation={navigation} />
    </div>
  );
};

export default Layout;
