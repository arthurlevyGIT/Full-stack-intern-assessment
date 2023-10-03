import React, { useEffect, useState } from "react";
import styles from "./Comments.module.css";
import Link from "next/link";

const Comments: React.FC = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const status: string = "authenticated";

  useEffect(() => {
    // Fetch comments from the API when the component mounts
    fetch("/api/comments") // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  const submitComment = () => {
    // Send a new comment to the API when the user submits it
    fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: newComment }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the state to include the new comment
        setComments([...comments, data]);
        setNewComment("");
      })
      .catch((error) => console.error("Error submitting comment:", error));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      <div className={styles.write}>
        <textarea
          placeholder="Write a comment..."
          className={styles.input}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className={styles.button} onClick={submitComment}>
          Send
        </button>
      </div>
      <div className={styles.comments}>
        {comments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            <div className={styles.user}>
              <div className={styles.userInfo}>
                <span className={styles.username}>{comment.author}</span>
                <span className={styles.date}> - {comment.createdAt}</span>
              </div>
            </div>
            <p className={styles.desc}>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
