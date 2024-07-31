import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import "./Transanctions.scss";

const Transanctions = () => {
  const transactionData = [
    { status: "Completed", count: 50 },
    { status: "In-Review", count: 30 },
    { status: "Pending", count: 20 },
    { status: "Canceled", count: 10 },
  ];
  const colors = ["#338AF3", "#2D2D2D", "#F7D240", "#EF5924"];

  return (
    <div className="transanctions">
      <h3>Order Processing</h3>
      <div className="transanctions-main-wrapper">
        <div className="transanctions-pie-chart">
          <PieChart width={300} height={300}>
            <Pie
              data={transactionData}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              cornerRadius={5}
              innerRadius={25}
              paddingAngle={-5}
              outerRadius={115}
              label
            >
              {transactionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div className="transanctions-indicators">
          {transactionData.map((type, index) => (
            <div key={index} className="transanction-indicator">
              <div className="color-status">
                <div
                  className="color-box"
                  style={{ backgroundColor: colors[index] }}
                ></div>
                <h4>{type.status}</h4>
              </div>
              <h2>{type.count}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transanctions;
