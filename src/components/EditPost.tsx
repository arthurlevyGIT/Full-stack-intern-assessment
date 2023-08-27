'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface EditPostProps {
  post: any;
}

const EditPost: React.FC<EditPostProps> = ({ post: initialPost = null }) => {
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

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const userData = localStorage.getItem('userData');
      if (!userData) return;

      const body = { title, content, published };
      const method = isEditing ? 'PATCH' : 'POST';
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

  const handleDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const userData = localStorage.getItem('userData');
      if (!userData) return;

      const response = await fetch(`/api/post/${initialPost.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${JSON.parse(userData).accessToken}`
        }
      });
      if (response.ok) {
        router.push('/');
      } else {
        console.error('Error while deleting post:', response.statusText);
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleButtonClick = () => {
    router.push('/');
  };

  const handleToggle = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setPublished(!published)
  };

  return (
    <div className="bg-gray-800 max-w-screen-md mx-auto py-2 rounded-md">
      <form onSubmit={submitData}>
        <input
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          type="text"
          value={title}
          className="bg-gray-800 text-center mx-auto my-5 block border border-white-200 rounded-md"
        />
        <textarea
          cols={50}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={8}
          value={content}
          className="bg-gray-800 px-3 py-2 placeholder: mx-auto my-3 block border border-white-200 rounded-md "
        />
        <div className="mx-auto text-center">
          <button
            className={`my-2 mr-2 p-1 px-3 border rounded-md border-gray-200 cursor-pointer duration-300 hover:text-blue-500 hover:border-blue-500 transition-colors duration-300 focus:outline-none ${published ? 'bg-green-500' : 'bg-red-500'
              }`}
            onClick={handleToggle}
          >
            Publish ?
          </button>
          <button
            disabled={!content || !title}
            className="my-2 mr-2 ml-2 px-3 p-1 border rounded-md border-gray-200 hover:text-blue-500 hover:border-blue-500 transition-colors duration-300"
          >
            {isEditing ? 'Save Changes' : 'Create'}
          </button>
          {isEditing && (
            <button
              onClick={handleDelete}
              className="my-2 ml-2 px-3 p-1 border rounded-md border-gray-200 hover:text-blue-500 hover:border-blue-500 transition-colors duration-300"
            >
              Delete
            </button>
          )}
          <button
            onClick={handleButtonClick}
            className="my-2 ml-2 px-3 p-1 border rounded-md border-gray-200 hover:text-blue-500 hover:border-blue-500 transition-colors duration-300"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );


};

export default EditPost;
