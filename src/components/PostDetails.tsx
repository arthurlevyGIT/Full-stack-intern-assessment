'use client'
import { useRouter } from "next/navigation"
import { PostProps } from "./Post"
import styles from '../styles/Post.module.css'
import ReactMarkdown from 'react-markdown'
import React, { useEffect, useState } from "react"

type Comment = {
  id: number
  createdAt: Date,
  updatedAt: Date,
  content: string,
  postId: number
}

export default function PostDetails({ title, author, content, published, id }: PostProps) {
  const router = useRouter()
  const [comments, setComments] = useState([])
  const [showComments, setShowComments] = useState(false)

  useEffect(() => {
    fetch(`/api/post/${id}/comments`, {
      method: 'GET',
    }).then(res => res.json()).then(res => {
      setComments(res)
    })
  }, [id])

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

  if (!published) {
    title = `${title} (Draft)`
  }

  const formatDate = (date: Date) => new Date(date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})


  return (
    <React.Fragment>
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
        <button className={styles.button} onClick={() => setShowComments((prev) => !prev)}>
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </button>
      </div>
      {showComments && (
        <div>
          <p className={styles.bold}>Comments</p>
          {comments.map((comment: Comment) => (
            <div className={styles.commentWrapper} key={comment.id}>
              <span>{comment.content}</span>
              <span className={styles.dateTime}>{formatDate(comment.createdAt)}</span>
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
  )
}
