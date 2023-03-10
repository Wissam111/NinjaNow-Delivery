import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
function ProtectedRoute({ component: Component, ...restOfProps }) {
  // const isAuthenticated = localStorage.getItem("isAuthenticated");
  // console.log("this", isAuthenticated);
  const { restaurant } = useAuthContext();
  return restaurant ? <Outlet /> : <Navigate to="/entry" />;
}

export default ProtectedRoute;
