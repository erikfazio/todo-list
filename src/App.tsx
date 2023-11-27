import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthRoute from "./components/AuthRoute";
import Dashboard from "./pages/Dashboard";
import Skills from "./pages/Skills";
import Users from "./pages/Users";
import Cv from "./pages/Cv";
import CvUser from "./pages/CvUser";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AuthRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/users" element={<Users />} />
          <Route path="/cv" element={<Cv />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cv/:userId" element={<CvUser />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
