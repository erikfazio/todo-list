import React from "react";
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
  const { auth, signOut } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { error } = await signOut();
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(auth);

  return (
    <nav className="p-4 border-b">
      <ul>
        {!auth && (
          <li>
            <a href="/login">Login</a>
          </li>
        )}
        {auth && (
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
        )}
        {auth && <button onClick={handleLogout}>Logout</button>}
      </ul>
    </nav>
  );
};

export default Navbar;
