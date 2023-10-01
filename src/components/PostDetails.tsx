'use client'
import { useRouter } from "next/navigation"
import { PostProps } from "./Post"
import styles from '../styles/Post.module.css'
import ReactMarkdown from 'react-markdown'
import Comment from "./Comment"
import CommentForm from "./CommentForm"

export default function PostDetails({ title, author, content, published, id, comments }: PostProps) {
  const router = useRouter()

  const loggedInUser = window.localStorage.getItem("user")
  const parsedUser = loggedInUser ? JSON.parse(loggedInUser) : null;

  async function publish(id: number) {
    await fetch(`/api/publish/${id}`, {
      method: 'PUT',
    })
    router.push('/')
  }

  async function destroy(id: number) {
    await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    })
    router.push('/')
  }

  async function comment(id: number) {
    await fetch(`/api/comments`, {
      method: 'GET',
    })
  }

  if (!published) {
    title = `${title} (Draft)`
  }


  return (
    <div>
      <h2>{title}</h2>
      <p>By {author?.name || 'Unknown author'}</p>
      {/* @ts-ignore */}
      <ReactMarkdown>{content}</ReactMarkdown>
      {!published && (
        <button
          className={styles.button} onClick={() => publish(id)}>
          Publish
        </button>
      )}
      <button className={styles.button} onClick={() => destroy(id)}>
        Delete
      </button>
      {comments && comments.map((comment, index) => (
        comment ? <Comment key={index} comment={comment}/> : null
      ))}
      <CommentForm 
        postId={id}
        author={parsedUser}
        onCommentSubmit={()=> comment(id)}
        />
      
    </div>

  )
}
