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
    <div className={styles.postDetails}>
      <main className={styles.post}>
        <h2 className={styles.h2}>{title}</h2>
        <p>By {author?.name || 'Unknown author'}</p>
        {/* @ts-ignore */}
        <ReactMarkdown>{content}</ReactMarkdown>
        {!published && (
          <button
            className={styles.btn1} onClick={() => publish(id)}>
            Publish
          </button>
        )}
        <button className={styles.btn2} onClick={() => destroy(id)}>
          Delete
        </button>
      </main>
      
      {published &&
       <div className={styles.commentsContainer}>
        <div className={styles.comments}>
          {comments && [...comments].reverse().map((comment, index) => (
            comment ? <Comment key={index} comment={comment}/> : null
          ))}
        </div>
        
        <div className={styles.commentForm}>
          <CommentForm 
            postId={id}
            author={parsedUser}
            onCommentSubmit={()=> comment(id)}
          />
        </div>
        
        </div>
      }
      
    </div>

  )
}
