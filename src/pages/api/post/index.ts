import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// POST /api/post
// Required fields in body: title, authorEmail
// Optional fields in body: content
export default async function handle(
  { body }: NextApiRequest,
  res: NextApiResponse,
) {

  if(!body.title || !body.authorEmail || !body.content) return res.status(400).json({error: 'Missing fields'})
  
  const { title, content, authorEmail } = body
  
  const author = await prisma.user.findUnique({
    where: { email: body.authorEmail },
  })
  
  if (!author) return res.status(400).json({error: 'Author not found'})

  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: authorEmail } },
    },
  })
  return res.status(201).json(result)
}
