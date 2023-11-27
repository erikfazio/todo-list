import { createContext, useContext, useEffect, useState } from "react";
import useSupabase from "@/hooks/useSupabase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const supabase = useSupabase();
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  const login = () => {
    supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const signOut = () => supabase.auth.signOut();

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;
      setUser(currentUser ?? null);
      setLoading(false);
    };

    getUser();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session.user);
        setAuth(true);
        navigate("/dashboard");
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setAuth(false);
        navigate("/");
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  function isAdmin() {
    return user?.app_metadata?.user_role === "ADMIN";
  }

  return (
    <AuthContext.Provider value={{ auth, user, login, isAdmin, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
