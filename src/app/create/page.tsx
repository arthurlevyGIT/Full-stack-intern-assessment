'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../../styles/Draft.module.css'

export default function Draft() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const userData = localStorage.getItem('userData');
      if (!userData)
        return;

      const published = true;
      const body = { title, content, published }
      await fetch(`/api/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(userData).accessToken}`},
        body: JSON.stringify(body),
      })

      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div>
        <form onSubmit={submitData}>
          <h1>Create Draft</h1>
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
          <input
            disabled={!content || !title}
            type="submit"
            value="Create"
          />
          <a className={styles.back} href="/">
            or Cancel
          </a>
        </form>
      </div>
    </>
  )
}
