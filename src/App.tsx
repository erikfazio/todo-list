import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthRoute from "./components/AuthRoute";
import Dashboard from "./pages/Dashboard";
import Skills from "./pages/Skills";
import Users from "./pages/Users";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AuthRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
