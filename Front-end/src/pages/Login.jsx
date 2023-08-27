import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
export default function Login({ setModalLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Connexion // -- // -- // -- // -- // -- // -- // -- // -- //

  const handleSubmitConnexion = async (event) => {
    event.preventDefault();
    setModalLogin(true);
    try {
      const response = await axios.post("http://localhost:3010/login", {
        username,
        password,
      });

      Cookies.set("connexion", username);
      navigate("/");
      console.log("Réponse de l'API:", response.data);
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      alert("Mauvais identifiant/mot de passe");
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
        <h2>Connexion</h2>
        <form onSubmit={handleSubmitConnexion}>
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
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
}
