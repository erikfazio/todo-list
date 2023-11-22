import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, login, isAdmin, signOut } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg("");
      setLoading(true);
      const {
        data: { user, session },
        error,
      } = await login();
      if (error) setErrorMsg(error.message);
      if (user && session) navigate("/dashboard");
    } catch (error) {
      setErrorMsg("Error");
    }
    setLoading(false);
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

  return (
    <nav className="flex items-center justify-between gap-x-8 p-4 border-b bg-white">
      <div className="flex gap-x-16">
        <span className="font-bold text-lg">Todo list app</span>
        <ul className="flex items-center gap-x-8">
          {user && (
            <>
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
      {!user && (
        <Button variant="outline" onClick={handleSubmit}>
          Login with google
        </Button>
      )}
    </nav>
  );
};

export default Navbar;
