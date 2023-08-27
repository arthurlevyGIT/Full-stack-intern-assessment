import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp({ setModalSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError("");
  };

  const handleSubmitInscription = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3010/register", {
        username,
        password,
      });
      console.log(response.data);
      navigate("/login");
      setModalSignup(true);
    } catch (error) {
      if (error.response && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("Erreur lors de l'inscription.");
      }
      console.error("Erreur lors de l'inscription:", error);
    }
  };

  return (
    <div className="sidentifier">
      <button
        className="ButtonBack"
        onClick={() => {
          navigate("/");
        }}
      >
        ⏎ Retour
      </button>
      <div>
        <h2>Inscription</h2>
        <form onSubmit={handleSubmitInscription}>
          <div>
            <label>Nom d'utilisateur:</label>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <label>Mot de passe:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </div>
  );
}
