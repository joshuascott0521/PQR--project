// components/PrivateRoute.tsx
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const auth = useContext(AuthContext);

  if (!auth) return <Navigate to="/" />;

  return auth.user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
