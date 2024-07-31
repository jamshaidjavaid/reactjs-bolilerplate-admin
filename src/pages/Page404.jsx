import React from "react";
import { Result } from "antd";
import "./Page404.scss";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/UI/PrimaryButton";

const Page404 = ({ homeLink }) => {
  return (
    <div className="page-404">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to={homeLink || "/admin"}>
            <PrimaryButton>Back to Home</PrimaryButton>
          </Link>
        }
      />
    </div>
  );
};

export default Page404;
