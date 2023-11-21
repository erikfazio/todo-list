import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import AuthRoute from "./components/AuthRoute";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<AuthRoute />}>
          <Route path="/tasks" element={<Tasks />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
