"use client";

import React from "react";
import styles from "../styles/Comment.module.css";
import { useState } from "react";

interface typeProp {
  postId: number;
}

const Comment = ({ postId }: typeProp) => {
  const [content, setContent] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");

  const submitComment = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { content, authorEmail, postId };
      await fetch(`/api/comment/${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.log("Be careful ! ", err);
    }
  };

  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentSection}>
        <p className="CounterComments">11 comments</p>
        <p>Name</p>
        <p>
          Example : Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Sequi neque harum soluta! Temporibus exercitationem cumque porro
          mollitia. Odio ipsa provident nihil voluptas fugit et dicta, a
          maiores, debitis omnis, incidunt rem adipisci sapiente? Blanditiis nam
          mollitia incidunt ex itaque saepe ullam voluptatibus, velit fugit
          recusandae, accusamus, id reiciendis reprehenderit rerum.
        </p>
      </div>
      <h3>Post a comment</h3>
      <form onSubmit={submitComment} className={styles.formCommentContainer}>
        <input
          type="text"
          name="author"
          onChange={(e) => setAuthorEmail(e.target.value)}
          placeholder="Name"
          className={styles.commentFormName}
          value={authorEmail}
        />
        <textarea
          className={styles.commentFormComment}
          placeholder="Comment"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <button>Post a comment</button>
      </form>
    </div>
  );
};

export default Comment;
