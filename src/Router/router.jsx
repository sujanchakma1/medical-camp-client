import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "../Pages/HomePage/Home/Home";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Login from "../Pages/AuthPage/Login/Login";
import Register from "../Pages/AuthPage/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
]);

export default router;
