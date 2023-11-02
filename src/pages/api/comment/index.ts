import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// POST /api/:postId/comments
// Required fields in body: content, postId
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { postId, content } = req.body
  const result = await prisma.comment.create({
    data: {
      content: content,
      postId: postId,
    },
  })
  return res.status(201).json(result)
}
