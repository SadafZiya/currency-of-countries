import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "../../design/errors/index.css";

const Errors = (props) => {
  const navigate = useNavigate();
  return (
    <div className="main-div-error-page">
      <img
        className={`error-image w-full h-full`}
        src={props.image}
        alt="error-page"
      />
      <Button type="primary" htmlType="button" onClick={() => navigate("/")}>
        Go Login Page
      </Button>
    </div>
  );
};

export default Errors;
