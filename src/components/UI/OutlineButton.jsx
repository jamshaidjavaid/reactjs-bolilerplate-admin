import React from "react";
import "./OutlineButton.scss";

const OutlineButton = ({ onClick, className, children, type }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`outline-button ${className}`}
    >
      {children}
    </button>
  );
};

export default OutlineButton;
