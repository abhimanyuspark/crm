import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import { useSelector } from "react-redux";

const RequireAuth = ({ roleAccess = [], url="" }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  if (user !== undefined && Object.keys(user).length > 0) {
    if (roleAccess.some((role) => user?.role?.includes(role))) {
      return <Layout />;
    } else {
      return (
        <Navigate
          to={`${url}/unAuthorized`}
          state={{ from: location }}
          replace
        />
      );
    }
  } else {
    return (
      <Navigate to={`${url}/login`} state={{ from: location }} replace />
    );
  }
};

export default RequireAuth;
