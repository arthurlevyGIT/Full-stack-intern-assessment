"use client";
import useSWR from "swr";
import React from "react";
import styles from "../styles/Comment.module.css";
import { useState } from "react";

interface typeProp {
  postId: number;
  userInfo: any;
  post: any;
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

function dateConver(date: string) {
  const dateDonnee = new Date(date);
  return dateDonnee.toLocaleString();
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

const Comment = ({ postId, userInfo, post }: typeProp) => {
  const [content, setContent] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");

  const { data, mutate } = useSWR(
    `http://localhost:3000/api/getComments`,
    fetcher
  );
  const submitComment = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { content, authorEmail, postId };
      const response = await fetch(`/api/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      isValidEmail(authorEmail);
      if (!isValidEmail(authorEmail)) {
        alert("Please enter a valid e-mail");
        return;
      }
      if (response.status === 500) {
        const errorElement = document.getElementById("errorMsg");
        if (errorElement) {
          errorElement.innerHTML =
            "please re enter your correct e-mail or sign up.";
        }
      } else {
        const errorElement = document.getElementById("errorMsg");
        if (errorElement) {
          errorElement.innerHTML = "";
        }
      }
      mutate();
      setContent("");
      setAuthorEmail("");
    } catch (err) {
      console.log("Be careful ! ", err);
    }
  };

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
    <>
      {post.published && (
        <div className={styles.commentContainer}>
          <h3>Post a comment</h3>
          <form
            onSubmit={submitComment}
            className={styles.formCommentContainer}>
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
          <p id="errorMsg" className={styles.errorMsg}></p>
          <div className={styles.commentSection}>
            <p className={styles.counterComments}>
              {getCommentByPostId(postId) &&
                (getCommentByPostId(postId).length > 1
                  ? `${getCommentByPostId(postId).length} Comments`
                  : `${getCommentByPostId(postId).length} Comment`)}
            </p>
            {getCommentByPostId(postId) &&
              (getCommentByPostId(postId).length === 0
                ? ""
                : getCommentByPostId(postId).map((comment: any) => (
                    <div key={comment.id} className={styles.listOfComments}>
                      <div className="otherInformations">
                        <h4>{commentName(comment.authorId)}</h4>
                        <small> {dateConver(comment.createdAt)}</small>
                      </div>
                      <li>{comment.content}</li>
                    </div>
                  )))}
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;
