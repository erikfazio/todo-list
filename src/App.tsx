import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthRoute from "./components/AuthRoute";
import Navbar from "./components/Navbar";
import Skills from "./pages/Skills";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AuthRoute />}>
          <Route path="/skills" element={<Skills />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
