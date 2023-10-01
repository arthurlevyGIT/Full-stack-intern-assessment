import { useState } from 'react';

type CommentFormProps =  {
  postId: number;
  author: any;
  onCommentSubmit?: () => void;
}

export default function CommentForm({ postId, author,onCommentSubmit }: CommentFormProps) {
  const [content, setContent] = useState('');
  const authorEmail = author?.email

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (content) {
      await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({ content, authorEmail, postId }),
        headers: { 'Content-Type': 'application/json' },
      });

      setContent('');

      if (onCommentSubmit) onCommentSubmit();
      window.location.reload()
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
      <button type="submit">Add Comment</button>
    </form>
  );
}


