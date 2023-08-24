import prisma from "../lib/prisma"
import Comment from "./comment/comment"

export default async function Comments() {
  const Data = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { content, authorEmail }
      await fetch(`/api/comment`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } catch (error) {
      console.error(error)
    }
  }
  })
  return (
    <>
      {feed.map((comment) => (
        <div key={comment.id}>
          <Comment comment={comment} />
        </div>
      ))}
    </>
  )
}
