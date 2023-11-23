import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthProvider";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const Sidebar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const { pathname } = location;

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { error } = await signOut();
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };

  const pages = [
    {
      value: "/dashboard",
      label: "Dashboard",
    },
    {
      value: "/skills",
      label: "Skills",
    },
    {
      value: "/users",
      label: "Users",
    },
    {
      value: "/cv",
      label: "CV",
    },
  ];

  return (
    <nav className="flex flex-col items-center justify-between gap-x-8 py-8 px-16 border-r bg-white">
      <div>
        <span className="font-bold text-lg">Internal tool</span>
        <ul className="flex flex-col gap-y-8 mt-16 items-center gap-x-8">
          {pages.map(({ value, label }) => (
            <li
              key={value}
              className={clsx("", {
                "font-bold": pathname === value,
              })}
            >
              <Link to={value}>{label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-y-8 items-center">
        <div className="flex gap-x-4 items-center">
          <img
            src={user.user_metadata.avatar_url}
            className="w-8 h-8 rounded-full"
          />
          <span>{user.user_metadata.full_name}</span>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Sidebar;
