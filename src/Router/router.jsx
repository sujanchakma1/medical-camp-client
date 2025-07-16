import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "../Pages/HomePage/Home/Home";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Login from "../Pages/AuthPage/Login/Login";
import Register from "../Pages/AuthPage/Register/Register";
import AvailableCamp from "../Layouts/AvailableCamp/AvailableCamp";
import CampDetails from "../Layouts/CampDetails/CampDetails";

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
      {
        path: "availableCamps",
        Component: AvailableCamp
      },
      {
        path: 'camp-details/:id',
        Component: CampDetails
      }
    ],
  },
]);

export default router;
