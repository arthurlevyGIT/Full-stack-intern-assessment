"use client";
import React from "react";
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
      <h2 className={styles.title}>{post.title?.slice(0, 30)}(...)</h2>
      <small className={styles.authorName}>By {authorName}</small>
      {/* @ts-ignore */}
      <p className={styles.content}>{post.content?.slice(0, 20)}(...)</p>

      <Link href={`/p/${post.id}`} className={styles.post}>
        View more
      </Link>
    </div>
  );
}
