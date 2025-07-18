import type { JSX } from "react";
import { Navigate } from "react-router-dom";

const isLoggedIn = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  // console.log(isLoggedIn);
  return isLoggedIn;
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
