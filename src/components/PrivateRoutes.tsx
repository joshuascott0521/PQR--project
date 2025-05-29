// components/PrivateRoute.tsx
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import LoadingScreen from "./shared/LoadingScreen";

const PrivateRoute = () => {
  const auth = useContext(AuthContext);

  if (!auth || auth.loading) {
    return <LoadingScreen />; 
  }

  return auth.user ? <Outlet /> : <Navigate to="/login" />;
};


export default PrivateRoute;
