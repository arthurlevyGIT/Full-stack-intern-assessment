import type { NextApiRequest, NextApiResponse } from 'next'
import { authMiddleware } from '../middleware/authMiddleware'
import prisma from '../../../lib/prisma'

// POST /api/post
// Required fields in body: title, published
// Optional fields in body: content
const handle = async function (
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // TODO: Check that the destructured req.body contains non null values
  const { title, content, published } = req.body;

  const newPost = await prisma.post.create({
      data: {
        title: title,
        content: content,
        published: published,
        author: {
          connect: { id: req.user.id }
        }
      }
    });
  return res.status(201).json(newPost)
}

export default authMiddleware(handle);
