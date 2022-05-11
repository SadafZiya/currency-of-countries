import React from "react";
import { Button } from "antd";
import { signOutService } from "../../services/serviceInfo";
import "../../design/header/index.css";
import { removeToken } from "../../utils/localStorages";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = new useNavigate();
  const signOut = async () => {
    let signOutResult = await signOutService();
    if (signOutResult) {
      removeToken();
      navigate("/");
    }
  };
  return (
    <div className={"main-div-header"}>
      <Button type="default" htmlType="button" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
};

export default Header;
