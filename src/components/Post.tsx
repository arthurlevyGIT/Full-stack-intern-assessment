'use client'
import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import styles from './Post.module.css'
import Link from 'next/link'
import type { Post, User } from '@prisma/client'
import AddComment from './AddComment'

export type PostProps = Post & {
  author: User | null
}

export default function Post({ post, isDraft }: { post: PostProps, isDraft: boolean }) {

  const [showAddComment, setShowAddComment] = useState(false)

  const handleAddComment = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    setShowAddComment((prev) => !prev)
  }

  const authorName = post.author ? post.author.name : 'Unknown author'
  return (
    <React.Fragment>
      <div className={styles.postWrapper}>
        <Link
          href={`/p/${post.id}`}
          className={styles.post}
        >
          <h2>{post.title}</h2>
          <small>By {authorName}</small>
          {/* @ts-ignore */}
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </Link>
        {!isDraft && <button className={styles.addCommentButton} onClick={handleAddComment}>Add Comment</button>}
        </div>
        {showAddComment && <AddComment postId={post.id} setShowAddComment={setShowAddComment}  />}
    </React.Fragment>
    
  )
}
