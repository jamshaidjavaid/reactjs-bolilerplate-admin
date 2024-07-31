import "./Topbar.scss";
import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import { Icon } from "@iconify/react";
import { Drawer } from "antd";
import { Link, NavLink, useLocation } from "react-router-dom";

import { LogoutIcon, ProfileImage, SearchIcon } from "../../assets";
import { useCurrentRoute } from "../../routes/route-context";
import Breadcrumb from "../Utilities/BreadCrumb";

const Topbar = ({ navigation }) => {
  const location = useLocation();
  const currentRoute = useCurrentRoute();
  const isIndex = location.pathname === "/admin" || location.pathname === "/";
  const [open, setOpen] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [inputPlaceholder, setInputPlaceholder] = useState("something");

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const logoutHandler = () => {
    console.log("logout");
  };

  const renderRoutes = navigation.map((route) => {
    return (
      <NavLink
        key={route.name}
        to={route.path}
        className={route.name === "Dashboard" && isIndex ? "active" : ""}
      >
        <div className="menu-item">
          <ReactSVG className="menu-icon" src={route.icon} />
          {route.name}
        </div>
      </NavLink>
    );
  });

  return (
    <div className="topbar">
      <div>
        <h2 className="page-headings-in-topbar">
          {currentRoute ? currentRoute.title : "Admin"}
        </h2>
        <Breadcrumb />
      </div>
      <div className="search-wrapper">
        {showInput && (
          <div className="search">
            <ReactSVG style={{ maxHeight: "19px" }} src={SearchIcon} />
            <input type="text" placeholder={`Search ${inputPlaceholder}`} />
          </div>
        )}
      </div>
      <div className="main-topbar-wrapper">
        <div className="menu-and-picture-actions">
          <div className="mobile-menu-button">
            <Icon
              icon="mingcute:menu-fill"
              width="36"
              height="36"
              className="svg-menu"
              onClick={showDrawer}
            />
          </div>
          <div className="picture-actions">
            <Link to={`/admin/profile`}>
              <img src={ProfileImage} alt="Profile" />
            </Link>
          </div>
        </div>
      </div>
      <Drawer
        placement={"left"}
        closable={true}
        onClose={onClose}
        open={open}
        width={`${window.screen.width * 0.8}px`}
        key={"left"}
        className="mobile-menu-drawer"
      >
        <div className="sidebar sidebar-mobile">
          <h1>REACTADMIN</h1>
          <div className="sidebar-menu">{renderRoutes}</div>
          <Link
            to={`/admin/login`}
            className="logout-button"
            onClick={logoutHandler}
          >
            <ReactSVG src={LogoutIcon} />
            Logout
          </Link>
        </div>
      </Drawer>
    </div>
  );
};

export default Topbar;
