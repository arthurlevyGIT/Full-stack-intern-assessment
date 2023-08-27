import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../src/index.css";
import Cookies from "js-cookie";

export default function Home({ setAuthorEmail, authorEmail }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

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

  const submitEdit = async (taskId) => {
    try {
      await axios.put(`http://localhost:3010/update/${taskId}`, {
        title: title,
        text: content,
      });
      fetchData();
      setEditingTask(null);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task._id);
    setTitle(task.title);
    setContent(task.text);
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
                  {editingTask === task._id ? (
                    <div>
                      <textarea
                        className="Modification"
                        cols={50}
                        rows={8}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      />
                      <button onClick={() => submitEdit(task._id)}>
                        Valider
                      </button>
                    </div>
                  ) : (
                    <p>{task.text}</p>
                  )}
                </div>
                <div className="buttonLeCommentaire">
                  <button onClick={() => handleDeleteTask(task._id)}>🗑️</button>
                  {task.name === Cookies.get("connexion") && (
                    <p onClick={() => handleEdit(task)}>Modifier</p>
                  )}
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
