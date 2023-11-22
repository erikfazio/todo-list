import { useAuth } from "../context/AuthProvider";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AuthRoute = () => {
  const { user } = useAuth();

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
