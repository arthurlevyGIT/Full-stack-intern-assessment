import { useNavigate } from "react-router-dom";

export default function Identify() {
  const navigate = useNavigate();
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
      <div className="LoginAndSignUp">
        <button
          onClick={() => {
            navigate("/signup");
          }}
        >
          Inscription
        </button>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Connexion
        </button>
      </div>
    </div>
  );
}
