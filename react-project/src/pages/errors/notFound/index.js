import React from "react";
import notFoundImage from "../../../assets/images/404.jpg";
import Errors from "../../../components/errors";

const NotFound = () => {
  return <Errors image={notFoundImage} />;
};

export default NotFound;
