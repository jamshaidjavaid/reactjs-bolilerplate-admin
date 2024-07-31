import React, { createContext, useContext } from "react";
import { useLocation, matchRoutes } from "react-router-dom";
import APP_ROUTES from "./App.routes";

const RouteContext = createContext();

export const RouteProvider = ({ children }) => {
  const location = useLocation();
  const adjustedPathname = location.pathname.replace("/admin", "");

  const routes = matchRoutes(APP_ROUTES, { pathname: adjustedPathname });
  const currentRoute = routes ? routes[routes.length - 1].route : null;

  // console.log(currentRoute);

  return (
    <RouteContext.Provider value={currentRoute}>
      {children}
    </RouteContext.Provider>
  );
};

export const useCurrentRoute = () => {
  return useContext(RouteContext);
};
