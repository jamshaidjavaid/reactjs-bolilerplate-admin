import React, { useState } from "react";
import { DatePicker } from "antd";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";

import { CalendarIcon, LinkIcon } from "../../assets";

import "./CardsAndTransanctions.scss";

const CardsAndTransanctions = () => {
  const [dateRange, setDateRange] = useState({ fromDate: "", toDate: "" });
  const cards = [
    {
      id: 1,
      heading: "Total Clients",
      link: "./clients",
      amount: "2,434",
    },
    {
      id: 2,
      heading: "Total Orders",
      link: "./orders",
      amount: "232",
    },
    {
      id: 3,
      heading: "Profits",
      link: "./profits",
      amount: "782,434",
    },
  ];

  const handleChange = (moment, dateString, name) => {
    setDateRange((prevDateRange) => ({
      ...prevDateRange,
      [name]: dateString,
    }));
  };

  return (
    <div className="cards-and-transanctions">
      <div className="cards-container">
        {cards.map((card, index) => (
          <div key={card.id} className="single-card">
            <Link to={card.link} className="text-link">
              <h4>{card.heading}</h4>
              <ReactSVG src={LinkIcon} />
            </Link>
            <h2>{card.amount}</h2>
          </div>
        ))}
      </div>
      <div className="transanction-container">
        <div className="transaction-row-1">
          <h4>Total value of orders</h4>
          <div className="inputs">
            <ReactSVG className="svg-icon" src={CalendarIcon} />
            <DatePicker
              placeholder="From"
              name="fromDate"
              format={"DD/MM/YYYY"}
              onChange={(date, dateString) =>
                handleChange(date, dateString, "fromDate")
              }
            />
            <DatePicker
              placeholder="To"
              name="toDate"
              format={"DD/MM/YYYY"}
              onChange={(date, dateString) =>
                handleChange(date, dateString, "toDate")
              }
            />
          </div>
        </div>
        <div className="transaction-row-2">
          <div className="row-2-left">
            <h2>345,234</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsAndTransanctions;
