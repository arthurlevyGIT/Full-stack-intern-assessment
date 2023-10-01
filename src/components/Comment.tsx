'use client'
import React from "react";
import styles from './Post.module.css'
import type { User, Comment } from '@prisma/client'

export type CommentProps = Comment & {
  author?: User | null;
}

export default function Comment({ comment } : { comment: CommentProps}) {
  console.log(comment)
  const authorName = comment.author?.name ? comment.author?.name : 'Unknown author'

  const handleDelete = async () => {
    await fetch(`/api/comment/${comment.id}`, {
      method: "DELETE",
    })
    window.location.reload()
  }

  console.log(authorName)

  
    return (
      <div>
        <p>{comment.content}</p>
        <small>By {authorName}</small>
        <button onClick={handleDelete}>Delete comment</button>
      </div>
    );
  }