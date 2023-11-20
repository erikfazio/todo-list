import { useAuth } from "../context/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  return <>{user ? <Outlet /> : <div>You are not authorized</div>}</>;
};

export default AuthRoute;
