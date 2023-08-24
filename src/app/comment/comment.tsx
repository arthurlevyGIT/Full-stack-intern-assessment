'use client'
import React, { useState } from 'react'

export default function createComment() {
  const [content, setContent] = useState('')
  const [authorEmail, setAuthorEmail] = useState('')

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { content, authorEmail }
      await fetch(`/api/comment/${postId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      console.log("comment sent")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
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
    </>
  )
}
