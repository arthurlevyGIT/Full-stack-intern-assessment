"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/SignUp.module.css";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { name, email };

      await fetch(`/api/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      isValidEmail(email);
      if (!isValidEmail(email)) {
        alert("Please enter a valid E-mail.");
        return;
      }
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.page}>
        <form onSubmit={submitData}>
          <h1>Register</h1>
          <input
            autoFocus
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            type="text"
            value={name}
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            type="text"
            value={email}
          />
          <input disabled={!name || !email} type="submit" value="Signup" />
          <a className={styles.back} href="/">
            or Cancel
          </a>
        </form>
      </div>
    </>
  );
}
