"use client";
import useSWR from "swr";
import React from "react";
import styles from "../styles/Comment.module.css";
import { useState } from "react";

interface typeProp {
  postId: number;
  userInfo: any;
}

//SWR function to mutate each comment
const fetcher = async (url: string) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

const Comment = ({ postId, userInfo }: typeProp) => {
  const [content, setContent] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");

  const { data, mutate } = useSWR(
    `http://localhost:3000/api/getComments`,
    fetcher
  );

  console.log("fetcher", data?.comments);

  const submitComment = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { content, authorEmail, postId };
      await fetch(`/api/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      mutate();
      setContent("");
      setAuthorEmail("");
    } catch (err) {
      console.log("Be careful ! ", err);
    }
  };
  // ca ne marche pas impossible de map
  function getCommentByPostId(postId: number): [] {
    return data?.comments.filter((it: any) => it.postId === postId);
  }

  function commentName(authorId: number) {
    for (let i = 0; i < userInfo.length; i++) {
      if (userInfo[i].id === authorId) {
        return userInfo[i].name;
      }
    }
  }

  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentSection}>
        <p className="CounterComments">
          {getCommentByPostId(postId) &&
            (getCommentByPostId(postId).length > 1
              ? `${getCommentByPostId(postId).length} Comments`
              : `${getCommentByPostId(postId).length} Comment`)}
        </p>
        {getCommentByPostId(postId) &&
          (getCommentByPostId(postId).length === 0
            ? ""
            : getCommentByPostId(postId).map((comment: any) => (
                <div key={comment.id}>
                  <li>{comment.content}</li>
                  <div className="otherInformations">
                    <span>{commentName(comment.authorId)} -</span>
                    <span> {comment.createdAt.toLocaleString()}</span>
                  </div>
                </div>
              )))}
      </div>
      <h3>Post a comment</h3>
      <form onSubmit={submitComment} className={styles.formCommentContainer}>
        <input
          type="text"
          name="author"
          onChange={(e) => setAuthorEmail(e.target.value)}
          placeholder="Email"
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
