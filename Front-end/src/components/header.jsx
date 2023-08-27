import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Header({ setAuthorEmail }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprimer le cookie lors de la déconnexion
    Cookies.remove("connexion");
    setAuthorEmail(""); // Réinitialiser l'email de l'auteur
    navigate("/");
  };

  // Vérifier si le cookie existe
  const isLoggedIn = Cookies.get("connexion");

  useEffect(() => {
    setAuthorEmail(Cookies.get("connexion") || "");
  }, [setAuthorEmail]);

  return (
    <div className="Header">
      <img
        className="logo"
        src="https://www.getlazo.app/big-logo.svg"
        alt="logo"
      />
      {isLoggedIn ? (
        <button className="Connexion" onClick={handleLogout}>
          Se déconnecter
        </button>
      ) : (
        <div className="ButtonIdentify">
          <button className="Connexion" onClick={() => navigate("/login")}>
            Connexion
          </button>
          <button className="Connexion" onClick={() => navigate("/signup")}>
            Inscription
          </button>
        </div>
      )}
    </div>
  );
}
