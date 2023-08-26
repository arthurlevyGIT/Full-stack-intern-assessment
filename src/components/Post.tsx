'use client'
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './Post.module.css';
import { useAuth } from '../context/authContext';
import type { Post, User } from '@prisma/client';
import EditPost from './EditPost';
import PostDetails from './PostDetails';

export type PostProps = Post & {
  author: User | null;
};

export default function Post({ post }: { post: PostProps }) {
  const { authenticated } = useAuth();
  const authorName = post.author ? post.author.name : 'Unknown author';
  const userData = localStorage.getItem('userData');
  const userIdFromUserData = userData ? JSON.parse(userData).id : null;

  const [isEditing, setIsEditing] = useState(false); // State to track whether editing mode is active
  const [isWatchingPost, setIsWatchingPost] = useState(false);

  const handleEditClick = () => {
    // Set the isEditing state to true when Edit button is clicked
    if (authenticated && post.author?.id === userIdFromUserData) {
      setIsEditing(!isEditing);
    }
  };

  const handleWatchClick = () => {
    setIsWatchingPost(!isWatchingPost);
  }

  return (
    <div className={styles.post}>
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      {/* @ts-ignore */}
      <ReactMarkdown>{post.content}</ReactMarkdown>
      {/* Show the edit button only if the user is authenticated and is the owner of the post */}
      {authenticated && post.author?.id === userIdFromUserData && (
        <>
          <button className={styles.editButton} onClick={handleEditClick}>
            Edit
          </button>
          {/* Conditionally render the EditPost component when isEditing is true */}
          {isEditing && <EditPost post={post} mainTitle="Edit Post" />}
        </>
      )}
      {post.published && (
        <>
          <button className={styles.editButton} onClick={handleWatchClick}>
            View more
          </button>
          {isWatchingPost && <PostDetails {...post} />}
        </>
      )}
    </div>
  );
}