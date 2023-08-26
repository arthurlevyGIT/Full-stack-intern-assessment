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
      <h2 className='bg-gray-700 mx-3 mt-3 px-2 py-2 rounded-md font-bold text-lg'>{title}</h2>
      <p className='mx-3 italic text-sm mt-1 mb-2'>By {author?.name}</p>
      {/* @ts-ignore */}
      <ReactMarkdown className='bg-gray-900 px-3 py-2 my-5 mx-3 rounded-md text-sky-500 font-medium'>{content}</ReactMarkdown>

      {comments && comments.length > 0 && (
        <div>
          <h3 className='mx-3 mb-2 font-bold'>Comments:</h3>
          <ul className='mx-3 mb-3'>
            {comments.map((comment, index) => (
              <li key={index} className='font-normal border-b border-gray-700'>
                <strong className='text-purple-300 font-normal'>{comment.author?.name}: </strong>
                {comment.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      {authenticated && (
        <div className="mx-3flex items-center justify-center">
          <textarea
            className="bg-gray-800 mx-auto my-2 block border border-white-200 rounded-md"
            placeholder="Write your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button onClick={handleCommentSubmit} className='block mx-auto my-2 p-1 border rounded-md border-gray-200'>Submit your comment</button>
        </div>
      )}
    </div>
  );
}
