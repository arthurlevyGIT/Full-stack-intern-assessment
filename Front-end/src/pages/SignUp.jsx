import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmitInscription = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3010/register", {
        username,
        password,
      });
      alert("Inscription réussie");
      console.log(response.data);
      navigate("/connexion");
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
    }
  };

  return (
    <div className="sidentifier">
      <button
        className="ButtonBack"
        onClick={() => {
          navigate("/identify");
        }}
      >
        ⏎ Come back
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
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </div>
  );
}
