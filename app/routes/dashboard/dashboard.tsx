import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import DashboardComponent from "~/components/route-components/DashboardComs/DashboardComponent";
import { getToken } from "~/components/route-components/getLocalStorage";
import { LoadingTyping } from "~/components/route-components/Loading/loading-typing";

const Dashboard = () => {
  const [checkingAuth, setCheckingAuth] = useState(true); // loader for initial auth check
  const token = getToken();

  // ✅ Only run once on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setCheckingAuth(false);
    }, 1);

    return () => clearTimeout(timer);
  }, []); // 👈 empty dependency array — runs only once

  // ✅ Show loader while auth is being checked or login request is in progress
  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen dark:bg-black">
        <LoadingTyping />
      </div>
    );
  }

  // ✅ Redirect if not authenticated
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <DashboardComponent>
      <Outlet />
    </DashboardComponent>
  );
};

export default Dashboard;
