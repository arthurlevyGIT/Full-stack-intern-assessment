"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import styles from "./Post.module.css";
import Link from "next/link";
import type { Post, User } from "@prisma/client";
import Image from "next/image";

export type PostProps = Post & {
  author: User | null;
};

export default function Post({ post }: { post: PostProps }) {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div className={styles.containerArticle}>
      <Image
        src="/dailyarticle.png"
        width={300}
        height={300}
        alt="dailyArticle"
        className={styles.image}
      />
      <h2>{post.title}</h2>
      {/* @ts-ignore */}
      <ReactMarkdown>{post.content} </ReactMarkdown>
      <small>By {authorName}</small>
      <Link href={`/p/${post.id}`} className={styles.post}>
        View more
      </Link>
    </div>
  );
}
