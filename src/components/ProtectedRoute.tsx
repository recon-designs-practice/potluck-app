import React from "react";
import { Navigate } from "react-router-dom";
import useSetupStore from "../stores/store";

type ProtectedRouteProps = {
  children?: React.ReactNode;
};

const ProtectedRoute = ({ children }: any) => {
  // @ts-expect-error
  const isLoggedIn = useSetupStore((state) => state.isLoggedIn);

  return isLoggedIn ? children : <Navigate to="/log-in" />;
};

export default ProtectedRoute;
