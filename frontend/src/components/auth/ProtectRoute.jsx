import React from "react";
import { Navigate, Outlet, replace } from "react-router-dom";
import AppLayout from "../layout/AppLayout";

const ProtectRoute = () => {
  const isAuthenticated = true;
  const isLoading = false;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectRoute;
