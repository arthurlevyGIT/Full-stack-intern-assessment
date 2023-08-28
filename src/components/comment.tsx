'use client'
import React, { useState } from 'react'

interface CommmentProps { postId: number};

export default function Comment({ postId }: CommmentProps) {
  const [authorEmail, setAuthorEmail] = useState('');
  const [content, setContent] = useState('');

  async function submitData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const body = {
      authorEmail,
      content,
    };

    try {
      const response = await fetch(`/api/comment/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const createdComment = await response.json();
        console.log('Comment created:', createdComment);
      } else {
        const errorData = await response.json();
        console.error('Error creating comment:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div>
      <form onSubmit={submitData}>
        <h1>Comment</h1>

        <input
          onChange={(e) => setAuthorEmail(e.target.value)}
          placeholder="Author (email address)"
          type="text"
          value={authorEmail}
        />
        <textarea
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          value={content}
        />
        <input
          disabled={!content || !authorEmail}
          type="submit"
          value="submit"
        />
      </form>
    </div>
  );
}
