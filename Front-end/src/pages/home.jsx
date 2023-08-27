import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../src/index.css";
import Cookies from "js-cookie";

export default function Home({ setAuthorEmail, authorEmail }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tasks, setTasks] = useState([]);

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

  return (
    <section>
      <h1> Les avis postés sur le blog : </h1>
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
        <h1>Laissez-nous un avis</h1>
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
      </form>
    </section>
  );
}
