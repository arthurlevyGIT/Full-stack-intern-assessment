import React from 'react'
import Post from '../../components/Post'
import prisma from '../../lib/prisma'
import styles from '../page.module.css'

async function Drafts() {
  const drafts = await prisma.post.findMany({
    where: { published: false },
    include: { author: true },
  })
  return (
    <>
      <div>
        <h1>Drafts</h1>
        <main className={styles.grid}>
          {drafts.map((post) => (
            <div key={post.id} className={styles.card}>
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
    </>
  )
}

export default Drafts;
