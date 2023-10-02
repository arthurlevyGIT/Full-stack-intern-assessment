'use client'
import React from "react";
import styles from './Comment.module.css'
import type { User, Comment } from '@prisma/client'

export type CommentProps = Comment & {
  author?: User | null;
}

export default function Comment({ comment } : { comment: CommentProps}) {
  console.log(comment)
  const authorName = comment.author?.name ? comment.author?.name : 'Unknown author'

  

  console.log(authorName)

  
    return (
      <div className={styles.comment}>
        <p>{comment.content}</p>
        <small>By {authorName}</small>
        
      </div>
    );
  }