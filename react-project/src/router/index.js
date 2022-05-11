import React from "react";
import { Routes, Route } from "react-router-dom";
import allRoute from "./allRoute";


function Router() {
  return (
    <div className="App">
      <Routes>
        {allRoute.map((route, index) => {
          return <Route {...route} key={index} />;
        })}
      </Routes>
    </div>
  );
}

export default Router;
