import React from "react";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import { Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Admin from "./components/Admin/Home";
import Home from "./components/Home/Home";
import Home1 from "./components/User/Home1";
import Users from "./components/Admin/Users";
import Donated from "./components/Admin/Donated";
import Requested from "./components/Admin/Requested";
const routes = (auth, loading, user) => [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "user",
        element:
          auth && loading ? (
            user.roles[0].name === "ROLE_USER" ? (
              <Home1 />
            ) : (
              <Navigate to="/admin" />
            )
          ) : (
            <Navigate to="/login" />
          ),
      },
      {
        path: "login",
        element: auth && loading ? <Navigate to="/user" /> : <Login />,
      },
      {
        path: "signup",
        element: auth && loading ? <Navigate to="/user" /> : <Signup />,
      },
    ],
  },
  {
    path: "/admin",
    element:
      auth && loading ? (
        user.roles[0].name === "ROLE_USER" ? (
          <Navigate to="/user" />
        ) : (
          <DashboardLayout />
        )
      ) : (
        <Navigate to="/login" />
      ),
    children: [
      { path: "/", element: <Admin /> },
      { path: "/users", element: <Users /> },
      { path: "/donated", element: <Donated /> },
      { path: "/request", element: <Requested /> },
    ],
  },
];

export default routes;