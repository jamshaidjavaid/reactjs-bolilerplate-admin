import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./BreadCrumb.scss";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((path) => path);

  return (
    <div>
      {pathnames.length > 0 && (
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            {pathnames.map((path, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
              const isLast = index === pathnames.length - 1;
              const displayName = path
                .replace(/-/g, " ")
                .replace(/^\w/, (c) => c.toUpperCase());

              return (
                <React.Fragment key={routeTo}>
                  {isLast ? (
                    <li aria-current="page">{displayName}</li>
                  ) : (
                    <li>
                      <Link to={routeTo}>{displayName}</Link>
                    </li>
                  )}
                  {!isLast && <li className="separator"> / </li>}
                </React.Fragment>
              );
            })}
          </ol>
        </nav>
      )}
    </div>
  );
};

export default Breadcrumb;
