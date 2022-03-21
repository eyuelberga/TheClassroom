import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import DashboardLayout from "../layouts/Dashboard";
import { useUserMetadata } from "../hooks";

const Layout: React.FC<Record<string, never>> = () => {
  const { role } = useUserMetadata();
  return (
    <DashboardLayout minimal>
      {role !== "TEACHER" ? (
        <Navigate to="/unauthorized" replace />
      ) : (
        <Outlet />
      )}
    </DashboardLayout>
  );
};

export default Layout;
