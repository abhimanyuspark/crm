import React from "react";
import { useSelector } from "react-redux";
import { APDashboard } from "./admin";
import { ClientDashboard } from "./client";

const DashBoards = ({ role }) => {
  const { user } = useSelector((state) => state.auth);

  if (user && user?.role?.includes(role.Client)) {
    return <ClientDashboard />;
  } else {
    return <APDashboard />;
  }
};

export default DashBoards;
