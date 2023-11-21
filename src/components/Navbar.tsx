import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthProvider";

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
    <nav className="p-4 border-b">
      <ul className="flex items-center justify-between">
        <div>
          {!user && (
            <li>
              <a href="/login">Login</a>
            </li>
          )}
          {user && (
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
          )}
        </div>
        {user && (
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
