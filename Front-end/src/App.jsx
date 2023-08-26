import "../../Front-end/src/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Identify from "./pages/Identify";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

export default function Draft() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/identify" element={<Identify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}
