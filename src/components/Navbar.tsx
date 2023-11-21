import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, signOut } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { error } = await signOut();
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="flex items-center justify-between gap-x-8 p-4 border-b bg-white">
      <div className="flex gap-x-16">
        <span className="font-bold text-lg">Todo list app</span>
        <ul className="flex items-center gap-x-8">
          {!user && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {user && (
            <>
              <li>
                <Link to="/tasks">Tasks</Link>
              </li>
              <li>
                <Link to="/skills">Skills</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {user && (
        <div className="flex gap-x-8 items-center">
          <span>{user.email}</span>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
