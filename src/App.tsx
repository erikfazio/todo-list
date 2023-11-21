import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AuthRoute from "./components/AuthRoute";
import Navbar from "./components/Navbar";
import Tasks from "./pages/Tasks";
import Skills from "./pages/Skills";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<AuthRoute />}>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/skills" element={<Skills />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
