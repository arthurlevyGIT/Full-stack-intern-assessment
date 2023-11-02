'use client'
import React, { Dispatch, SetStateAction, useState } from 'react'
import styles from './AddComment.module.css'

type Props = {
  postId: number,
  setShowAddComment: Dispatch<SetStateAction<boolean>>
}

export default function AddComment(props: Props) {
  const { postId, setShowAddComment } = props

  const [content, setContent] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('')
    setContent(e.target.value)
  }

  const handleAddComments = async (e: any) => {
    if (!content.trim() || content.trim().length < 2) {
      setErrorMessage('Insert valid comment content!')
      return
    }
    e.preventDefault();
    try {
      const body = { content, postId }
      await fetch(`/api/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).then(() => {
        alert('Comment Added Successfully!')
      }).catch(() => {
        alert('Error while adding comment!')
      })
      setShowAddComment(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={styles.addCommentWrapper}>
      <div className={styles.textAreaWrapper}>
        <input type='textarea' onChange={handleOnChange} placeholder='Type comment...' />
        <button className={styles.button} onClick={handleAddComments}>Add</button>
      </div>
      {errorMessage && <span className={styles.errorMsg}>{errorMessage}</span>}
    </div>
  )
}
