import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../src/index.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setAuthorEmail(Cookies.get("connexion") || "");
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3010/");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const submitData = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3010/create", {
        title: title,
        text: content,
        name: authorEmail,
      });
      fetchData();
      setTitle("");
      setContent("");
      setAuthorEmail("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3010/delete/${taskId}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    // Supprimer le cookie lors de la déconnexion
    Cookies.remove("connexion");
    navigate("/");
    setAuthorEmail("");
  };

  // Vérifier si le cookie existe
  const isLoggedIn = Cookies.get("connexion");

  return (
    <section>
      {isLoggedIn ? (
        <button className="Connexion" onClick={handleLogout}>
          Se déconnecter
        </button>
      ) : (
        <button className="Connexion" onClick={() => navigate("/identify")}>
          Connexion/Inscription
        </button>
      )}

      <h1>Les commentaires : </h1>
      <div className="LesCommentaires">
        {tasks.length >= 1 ? (
          <div>
            {tasks.map((task) => (
              <div key={task._id} className="LeCommentaire">
                <div>
                  <h3>{task.name}</h3>
                  <p>{task.text}</p>
                </div>
                <div>
                  <button onClick={() => handleDeleteTask(task._id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1>Aucun commentaire</h1>
        )}
      </div>
      <form onSubmit={submitData}>
        <h1>Laisse un commentaire :</h1>
        <div className="Formulaire">
          <input
            onChange={(e) => setAuthorEmail(e.target.value)}
            placeholder="Author"
            type="text"
            value={authorEmail}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Drafts"
            rows={8}
            value={content}
          />
          <input
            disabled={!content || !authorEmail}
            type="submit"
            value="Create"
          />
        </div>
        {/* <a href="/">or Cancel</a> */}
      </form>
    </section>
  );
}
