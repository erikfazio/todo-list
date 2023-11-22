import { useAuth } from "../context/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const AuthRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <>
      {user ? (
        <div className="w-full h-full flex">
          <Sidebar />
          <Outlet />
        </div>
      ) : (
        <div>You are not authorized</div>
      )}
    </>
  );
};

export default AuthRoute;
