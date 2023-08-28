import "../../Front-end/src/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useState } from "react";

import ModalLogin from "./components/ModalLogin";
import ModalSignup from "./components/ModalSignup";

import Header from "./components/header";
import Footer from "./components/Footer";

export default function Draft() {
  const [authorEmail, setAuthorEmail] = useState("");
  const [modalLogin, setModalLogin] = useState(false);
  const [modalSignup, setModalSignup] = useState(false);

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
        <Route
          path="/login"
          element={
            <Login setModalLogin={setModalLogin} modalLogin={modalLogin} />
          }
        />
        <Route
          path="/signup"
          element={
            <SignUp setModalSignup={setModalSignup} modalSignup={modalSignup} />
          }
        />
      </Routes>
      {modalLogin && (
        <ModalLogin setModalLogin={setModalLogin} modalLogin={modalLogin} />
      )}

      {modalSignup && (
        <ModalSignup
          setModalSignup={setModalSignup}
          modalSignup={modalSignup}
        />
      )}
      <Footer />
    </Router>
  );
}
