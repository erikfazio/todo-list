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
    <nav className="flex flex-col items-center justify-between gap-x-8 p-4 border-b bg-white">
      <div>
        <span className="font-bold text-lg">Internal tool</span>
        <ul className="flex mt-16 items-center gap-x-8">
          <>
            <li>
              <Link to="/skills">Skills</Link>
            </li>
          </>
        </ul>
      </div>

      <div className="flex gap-x-8 items-center">
        <span>{user.email}</span>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
