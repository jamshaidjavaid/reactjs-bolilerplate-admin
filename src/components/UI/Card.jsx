import React from "react";
import "./Card.scss";

const Card = ({ className = "", children }) => {
  return <div className={`custom-card-container ${className}`}>{children}</div>;
};

export default Card;
