'use client'
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../context/authContext';
import type { Post, User } from '@prisma/client';
import EditPost from './EditPost';
import PostDetails from './PostDetails';

export type PostProps = Post & {
  author: User;
};

export default function Post({ post }: { post: PostProps }) {
  const { authenticated } = useAuth();
  const authorName = post.author.name;
  const createdAt = new Date(post.createdAt);

  const [isEditing, setIsEditing] = useState(false); // State to track whether editing mode is active
  const [isWatchingPost, setIsWatchingPost] = useState(false);
  const [viewMessage, setViewMessage] = useState('View more');
  const [userId, setUserId] = useState(null);
  const months = ['January', 'February', 'March', 'April', 'May',
  'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  useEffect(() => {
    const data = localStorage.getItem('userData');
    setUserId(data ? JSON.parse(data).id : null);
  }, []);

  const handleEditClick = () => {
    // Set the isEditing state to true when Edit button is clicked
    if (authenticated && post.author?.id === userId) {
      setIsEditing(!isEditing);
    }
  };

  const handleWatchClick = () => {
    setIsWatchingPost(!isWatchingPost);
    if (isWatchingPost)
      setViewMessage('View more');
    else
      setViewMessage('View less')
  }

  return (
    <div className="bg-gray-800 max-w-screen-md mx-auto my-10 py-2 rounded-md">
      {!isWatchingPost && (
        <>
          <h2 className='bg-gray-700 mx-3 mt-3 px-2 py-2 rounded-md font-bold text-lg'>{post.title}</h2>
          <p className='mx-3 italic text-sm mt-1 mb-2'>
            By {authorName}, it was created on {months[createdAt.getUTCMonth()]} {createdAt.getUTCDate()}, {createdAt.getUTCFullYear()} at {createdAt.getUTCHours()}:{createdAt.getUTCMinutes()}.
          </p>
          {/* @ts-ignore */}
          <ReactMarkdown className='bg-gray-900 px-3 py-2 my-5 mx-3 rounded-md text-sky-500 font-medium'>{post.content}</ReactMarkdown>
        </>
      )}
      {/* Show the edit button only if the user is authenticated and is the owner of the post */}
      {authenticated && post.author?.id === userId && (
        <>
          <button onClick={handleEditClick} className='block mx-auto px-3 my-2 p-1 border rounded-md border-gray-200'>
            {isEditing ? 'I dont want to edit anymore' : 'Edit'}
          </button>
          {/* Conditionally render the EditPost component when isEditing is true */}
          {isEditing && <EditPost post={post} mainTitle="Edit Post" />}
        </>
      )}
      {post.published && (
        <>
          {isWatchingPost && <PostDetails {...post} />}
          <button onClick={handleWatchClick} className='block px-3 mx-auto my-2 p-1 border rounded-md border-gray-200'>
            {viewMessage}
          </button>
        </>
      )}
    </div>
  );
}