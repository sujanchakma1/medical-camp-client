import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "../Pages/HomePage/Home/Home";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Login from "../Pages/AuthPage/Login/Login";
import Register from "../Pages/AuthPage/Register/Register";
import CampDetails from "../Pages/CampDetails/CampDetails";
import AvailableCamp from "../Pages/AvailableCamp/AvailableCamp";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import Profile from "../Pages/Dashboard/Profile/Profile";
import AddCamp from "../Pages/Dashboard/AddCamp/AddCamp";
import ManageCamp from "../Pages/Dashboard/ManageCamp/ManageCamp";
import UpdateCamp from "../Pages/Dashboard/UpdateCamp/UpdateCamp";
import ManageRegisteredCamps from "../Pages/Dashboard/ManageRegisteredCamps/ManageRegisteredCamps";
import Payment from "../Pages/Payment/Payment";
import MyCamp from "../Pages/Dashboard/MyCamp/MyCamp";
import Analytics from "../Pages/Dashboard/Analytics/Analytics";
import RegisteredCamps from "../Pages/Dashboard/RegisteredCamps/RegisteredCamps";
import FeedbackForm from "../Pages/Dashboard/FeedbackForm/FeedbackForm";

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
        Component: AvailableCamp,
      },
      {
        path: "camp-details/:id",
        Component: CampDetails,
      },
    ],
  },
  {
    path: "dashboard",
    Component: DashboardLayout,
    children: [
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "my-camp",
        Component: MyCamp,
      },
      {
        path: "add-camp",
        Component: AddCamp,
      },
      {
        path: "manage-camp",
        Component: ManageCamp,
      },
      {
        path: "update-camp/:id",
        Component: UpdateCamp,
      },
      {
        path: "manage-registered",
        Component: ManageRegisteredCamps,
      },
      {
        path: "payment/:participantId",
        Component: Payment,
      },
      // Participant route
      { path: "analytics", Component: Analytics },
      {
        path: "registered-camps",
        Component: RegisteredCamps
      },
      {
        path: "feedback/:id",
        Component: FeedbackForm
      }
    ],
  },
]);

export default router;
