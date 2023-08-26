'use client'
import React, { useState } from 'react';
import { PostProps } from './Post';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../context/authContext';

export default function PostDetails({ title, author, content, comments, id }: PostProps & { authenticated: boolean }) {
  const [commentText, setCommentText] = useState('');
  const { authenticated } = useAuth();

  const handleCommentSubmit = async () => {
    if (!authenticated) {
      console.log("User is not authenticated.");
      return;
    }

    const body = {
      postId: id,
      text: commentText,
    };

    try {
      const userData = localStorage.getItem('userData');
      if (!userData)
        return;
      const accessToken = JSON.parse(userData).accessToken;
      const response = await fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        // Handle successful comment submission
        setCommentText('');
      } else {
        console.error('Failed to post comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      <p>By {author?.name}</p>
      {/* @ts-ignore */}
      <ReactMarkdown>{content}</ReactMarkdown>

      {comments && comments.length > 0 && (
        <div>
          <h3>Comments:</h3>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>
                <strong>{comment.author?.name}: </strong>
                {comment.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      {authenticated && (
        <div>
          <textarea
            placeholder="Write your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button onClick={handleCommentSubmit}>Submit Comment</button>
        </div>
      )}
    </div>
  );
}
