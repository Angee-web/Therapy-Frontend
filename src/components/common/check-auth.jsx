import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const CheckAuth = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const location = useLocation();

  // Define public routes
  const publicRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/input-otp",
    "/auth/reset-password",
    "/auth/confirm-reset",
  ];

  // Prevent premature redirects
  if (isLoading) {
    return <div>Loading...</div>; // Replace with a proper loader
  }

  // Redirect authenticated users to /therapy
  if (isAuthenticated && publicRoutes.includes(location.pathname)) {
    return <Navigate to="/therapy" replace />;
  }

  return <>{children}</>; // Render children for valid public routes
};

export default CheckAuth;