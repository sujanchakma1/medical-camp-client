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
import PrivateRoute from "../Routes/PrivateRoute";
import AdminRoute from "../Routes/AdminRoute";
import ParticipantRoute from "../Routes/ParticipantRoute";
import Forbidden from "../Pages/ForbiddenPage/Forbidden";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import VolunteerManagement from "../Pages/Dashboard/VolunteerManagement/VolunteerManagement";

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
        element: (
          <PrivateRoute>
            <CampDetails></CampDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "profile",
        Component: Profile,
      },

      {
        path: "add-camp",
        element: (
          <AdminRoute>
            <AddCamp></AddCamp>
          </AdminRoute>
        ),
      },
      {
        path: "manage-camp",
        element: (
          <AdminRoute>
            <ManageCamp></ManageCamp>
          </AdminRoute>
        ),
      },
      {
        path: "update-camp/:id",
        element: (
          <AdminRoute>
            <UpdateCamp></UpdateCamp>
          </AdminRoute>
        ),
      },
      {
        path: "manage-registered",
        element: (
          <AdminRoute>
            <ManageRegisteredCamps></ManageRegisteredCamps>
          </AdminRoute>
        ),
      },
      {
        path: "volunteers",
        element: <AdminRoute><VolunteerManagement></VolunteerManagement></AdminRoute>
      },

      // Participant
      {
        path: "payment/:participantId",
        element: (
          <ParticipantRoute>
            <Payment></Payment>
          </ParticipantRoute>
        ),
      },
      {
        path: "my-camp",
        element: (
          <ParticipantRoute>
            <MyCamp></MyCamp>
          </ParticipantRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <ParticipantRoute>
            <Analytics></Analytics>
          </ParticipantRoute>
        ),
      },
      {
        path: "registered-camps",
        element: (
          <ParticipantRoute>
            <RegisteredCamps></RegisteredCamps>
          </ParticipantRoute>
        ),
      },
      {
        path: "feedback/:id",
        element: <FeedbackForm></FeedbackForm>,
      },
    ],
  },
  {
    path: "forbidden",
    Component: Forbidden,
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);

export default router;
