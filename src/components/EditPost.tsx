'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import styles from './EditPost.module.css';
import styles from '../styles/Draft.module.css'


const EditPost = ({ post: initialPost = null }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (initialPost) {
      setTitle(initialPost.title);
      setContent(initialPost.content);
      setPublished(initialPost.published);
      setIsEditing(true);
    }
  }, [initialPost]);

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const userData = localStorage.getItem('userData');
      if (!userData) return;

      const body = { title, content, published };
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing ? `/api/post/${initialPost.id}` : '/api/post';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(userData).accessToken}`
        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        router.push('/');
      } else {
        console.error('Error while saving post:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={submitData}>
        <input
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          type="text"
          value={title}
        />
        <textarea
          cols={50}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={8}
          value={content}
        />
        <label>
          Publish:
          <input
            type="checkbox"
            checked={published}
            onChange={() => setPublished(!published)}
          />
        </label>
        <input
          disabled={!content || !title}
          type="submit"
          value={isEditing ? 'Save Changes' : 'Create'}
        />
        <a className={styles.back} href="/">
          or Cancel
        </a>
      </form>
    </div>
  );
};

export default EditPost;
