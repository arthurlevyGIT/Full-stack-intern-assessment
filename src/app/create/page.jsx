import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../../styles/Draft.module.css";

export default function Draft() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTask = async () => {
    if (newTask.trim() !== "") {
      await axios.post("http://localhost:3000/create", {
        name: newTask,
        list: newTask,
      });
      fetchData();
      setNewTask("");
    }
  };

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const body = { title, content, authorEmail };
      await fetch(`/api/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={submitData}>
        <h1>Create Draft</h1>
        <input
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          type="text"
          value={title}
        />
        <input
          onChange={(e) => setAuthorEmail(e.target.value)}
          placeholder="Author (email address)"
          type="text"
          value={authorEmail}
        />
        <textarea
          cols={50}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={8}
          value={content}
        />
        <input
          disabled={!content || !title || !authorEmail}
          type="submit"
          value="Create"
        />
        <a className={styles.back} href="/">
          or Cancel
        </a>
      </form>

      <div>
        <h2>Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>{task.name}</li>
          ))}
        </ul>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
}
