import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
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

  return (
    <div>
      <div className="container mx-auto">
        <button onClick={handleSubmit}>Login with google</button>
      </div>
    </div>
  );
};

export default Login;