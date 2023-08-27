import "../../Front-end/src/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Identify from "./pages/Identify";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useState } from "react";

import Header from "./components/header";

export default function Draft() {
  const [authorEmail, setAuthorEmail] = useState("");
  return (
    <Router>
      <Header setAuthorEmail={setAuthorEmail} />
      <Routes>
        <Route
          path="/"
          element={
            <Home setAuthorEmail={setAuthorEmail} authorEmail={authorEmail} />
          }
        />
        <Route path="/identify" element={<Identify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}
