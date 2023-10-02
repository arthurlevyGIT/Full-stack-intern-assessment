import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// POST /api/comment
// Required fields in body: title, authorEmail
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try{
    const { content, authorEmail, postId } = req.body
    console.log("req.body from comment api:", req.body)
    const result = await prisma.comment.create({
      data: {
        content: content,
        author: { connect: { email: authorEmail } },
        post: { connect: { id: Number(postId)}}
      },
    })
    return res.status(201).json(result)
    } catch (error:any) {
      console.log("error in comment api", error)
      return res.status(500).json({message: error.message})
    }
  
}
