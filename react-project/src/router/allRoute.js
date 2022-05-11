import React from "react";
import LogIn from "../pages/logIn";
import NotFound from "../pages/errors/notFound";
import SearchCountries from "../pages/searchCountries";
import UnAthorize from "../pages/errors/unAthorize";

const allRoute = [
  { path: "*", element: <NotFound /> },
  { path: "/404", element: <NotFound /> },
  { path: "/401", element: <UnAthorize /> },
  { path: "/", element: <LogIn /> },
  { path: "/searchCountries", isPrivate: true, element: <SearchCountries /> },
];
export default allRoute;
