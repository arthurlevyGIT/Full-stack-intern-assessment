'use client'
import React from 'react';
import { PostProps } from './Post';
import styles from '../styles/Post.module.css';
import ReactMarkdown from 'react-markdown';

export default function PostDetails({ title, author, content, comments }: PostProps) {
  return (
    <div>
      <h2>{title}</h2>
      <p>By {author?.name}</p>
      {/* @ts-ignore */}
      <ReactMarkdown>{content}</ReactMarkdown>

      {comments && comments.length > 0 && (
        <div className={styles.comments}>
          <h3>Comments:</h3>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment.text}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
