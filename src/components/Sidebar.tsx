import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthProvider";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import useUserByIdQuery from "@/hooks/users/useUserByIdQuery";

const Sidebar = () => {
  const { user, isAdmin, signOut } = useAuth();
  const { data: profile, isLoading: isProfileLoading } = useUserByIdQuery();
  const location = useLocation();
  const { pathname } = location;

  const getDisplayName = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    }
    return user.user_metadata.full_name;
  };

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
      isAdminOnly: false,
    },
    {
      value: "/skills",
      label: "Skills",
      isAdminOnly: false,
    },
    {
      value: "/users",
      label: "Users",
      isAdminOnly: false,
    },
    {
      value: "/cv",
      label: "CV",
      isAdminOnly: true,
    },
  ];

  console.log(profile);

  return (
    <nav className="flex flex-col items-center justify-between gap-x-8 py-8 px-16 border-r bg-white">
      <div>
        <span className="font-bold text-lg">Internal tool</span>
        <ul className="flex flex-col gap-y-8 mt-16 items-center gap-x-8">
          {pages.map(({ value, label, isAdminOnly }) => {
            if ((isAdminOnly && isAdmin()) || !isAdminOnly) {
              return (
                <li key={value}>
                  <Link
                    to={value}
                    className={clsx(
                      "flex items-center gap-x-4 text-lg",
                      pathname === value && "font-bold"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </div>

      <div className="flex flex-col gap-y-8 items-center">
        <div className="flex gap-x-4 items-center">
          <img
            src={user.user_metadata.avatar_url}
            className="w-8 h-8 rounded-full"
          />
          <Link to="/profile">{getDisplayName()}</Link>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Sidebar;
