import React from "react";
import type { Comment, User } from "@prisma/client";
import style from "./Comment.module.css";
import ReactMarkdown from "react-markdown";

export type CommentProps = Comment & {
  author: User | null;
};

export default function Comment({
  author,
  content,
  createdAt,
  likes,
}: CommentProps) {
  return (
    <div className={style.comment}>
      <div className={style.header}>
        <p>
          <strong>{author?.name}</strong>
        </p>
        <span>
          {createdAt?.toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
      <ReactMarkdown>{content!}</ReactMarkdown>
    </div>
  );
}
