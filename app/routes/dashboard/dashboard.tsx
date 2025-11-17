import React from "react";
import { Outlet } from "react-router";
import DashboardComponent from "~/components/route-components/DashboardComs/DashboardComponent";

const Dashboard = () => {
  return (
    <DashboardComponent>
      <Outlet />
    </DashboardComponent>
  );
};

export default Dashboard;
