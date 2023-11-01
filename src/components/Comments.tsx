"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Comment, { CommentProps } from "./Comment";
import styles from "./Comment.module.css";

function NewComment({ postId }: { postId: number }) {
  console.log(postId);
  const router = useRouter();
  const [content, setContent] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { postId, content, authorEmail };
      await fetch(`/api/comment/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.newComment}>
      <form onSubmit={submitData}>
        <h2>New Comment</h2>
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
          rows={4}
          value={content}
        />
        <input
          disabled={!content || !authorEmail}
          type="submit"
          value="Submit"
          className={styles.btn}
        />
      </form>
    </div>
  );
}

interface CommentInterface {
  post: number;
  items: CommentProps[];
}

export default function Comments({ post, items }: CommentInterface) {
  console.log(items);
  return (
    <>
      <NewComment postId={post} />
      <div className={styles.list}>
        {items && items.length > 0
          ? items?.map((comment) => <Comment {...comment!} />)
          : "No comments"}
      </div>
    </>
  );
}
