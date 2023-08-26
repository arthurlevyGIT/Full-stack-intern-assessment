'use client'
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './Post.module.css';
import { useAuth } from '../context/authContext'; // Import the auth context or hook
import type { Post, User } from '@prisma/client';
import EditPost from './EditPost'; // Import the EditPost component

export type PostProps = Post & {
  author: User | null;
};

export default function Post({ post }: { post: PostProps }) {
  const { authenticated } = useAuth();
  const authorName = post.author ? post.author.name : 'Unknown author';
  const userData = localStorage.getItem('userData');
  const userIdFromUserData = userData ? JSON.parse(userData).id : null;

  const [isEditing, setIsEditing] = useState(false); // State to track whether editing mode is active

  const handleEditClick = () => {
    // Set the isEditing state to true when Edit button is clicked
    if (authenticated && post.author?.id === userIdFromUserData) {
      setIsEditing(true);
    }
  };

  // const handlePostClick = () => {
  //   // Set the isEditing state to true when the post div is clicked
  //   if (authenticated && post.author?.id === userIdFromUserData) {
  //     setIsEditing(true);
  //   }
  // };

  return (
    // <div className={styles.post} onClick={handlePostClick}>
    <div className={styles.post}>
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      {/* @ts-ignore */}
      <ReactMarkdown>{post.content}</ReactMarkdown>
      {/* Show the edit button only if the user is authenticated and is the owner of the post */}
      {authenticated && post.author?.id === userIdFromUserData && (
        <>
          <button className={styles.editButton} onClick={handleEditClick}>
          {/* <button className={styles.editButton}> */}
            Edit
          </button>
          {/* Conditionally render the EditPost component when isEditing is true */}
          {isEditing && <EditPost post={post} mainTitle="Edit Post" />}
        </>
      )}
    </div>
  );
}