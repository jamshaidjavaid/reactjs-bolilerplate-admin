import React from "react";
import "./TertiaryButton.scss";

const TertiaryButton = ({ onClick, className, children, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`tertiary-button ${className}`}
    >
      {children}
    </button>
  );
};

export default TertiaryButton;
