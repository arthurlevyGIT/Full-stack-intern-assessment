"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/Draft.module.css";

export default function Draft() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const router = useRouter();

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content, authorEmail };
      const response = await fetch(`/api/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.status === 500) {
        const errorElement = document.getElementById("errorMsg");

        if (errorElement) {
          // elem avec innerHTML
          errorElement.innerHTML = "No account, please sign up first.";
        }
      } else {
        router.push("/drafts");
      }
    } catch (error) {
      console.log("ERROR USER", error);
    }
  };

  return (
    <>
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
          <p id="errorMsg" className={styles.errorMsg}></p>
        </form>
      </div>
    </>
  );
}
