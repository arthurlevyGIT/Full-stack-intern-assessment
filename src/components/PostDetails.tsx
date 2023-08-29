'use client'
import { useRouter } from "next/navigation"
import { PostProps } from "./Post"
import styles from '../styles/Post.module.css'
import ReactMarkdown from 'react-markdown'
import { useState } from 'react'

export default function PostDetails({ title, author, content, published, id }: PostProps) {
  const router = useRouter()
  const [comContent, setComContent] = useState('')

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

	async function submitComment(e: React.SyntheticEvent) {
		e.preventDefault()
		try {
			const body = { content: comContent, postId: id }
			await fetch(`/api/comment/${id}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			})
			window.location.reload()
		} catch (error) {
			console.error(error)
		}
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
	  <form onSubmit={submitComment}>
	  	<textarea
			onChange={(e) => setComContent(e.target.value)}
			placeholder="Leave a comment"
			value={comContent}
		/>
		<input
			disabled={!comContent}
			type="submit"
	  	/>			
	  </form>
    </div>

  )
}
