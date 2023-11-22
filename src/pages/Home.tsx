import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, login } = useAuth();

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
  return (
    <main className="flex">
      {!user && (
        <Button variant="outline" onClick={handleSubmit}>
          Login with google
        </Button>
      )}
    </main>
  );
}

export default Home;
