import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'

// GET /api/:postId/comments
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const postId = req.query.id

  switch (req.method) {
    case 'GET':
      return handleGetComments(postId, res)

    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`,
      )
  }
}

// DELETE /api/post/:id
async function handleGetComments(postId: unknown, res: NextApiResponse<any>) {
  const comments = await prisma.comment.findMany({
    where: { postId: Number(postId) },
    orderBy: [
      {
        createdAt: 'desc',
      }
    ],
  })
  return res.json(comments)
}
