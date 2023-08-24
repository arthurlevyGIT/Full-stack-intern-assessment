import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
/**
 * @swagger
 * /api/comment
 */
export const createComment = async (
    { body, query }: NextApiRequest,
    res: NextApiResponse,
  ) => {

    if(!query.id) return res.status(400).json({error: 'Missing id'})

    if(!body.authorEmail || !body.content) return res.status(400).json({error: 'Missing fields'})

    const postId = +query.id

    const verifiedId = await prisma.post.findUnique({
        where: { id: postId },
        })

    if(!verifiedId) return res.status(400).json({error: 'Post not found'})

    const { authorEmail, content }: {authorEmail: string,content: string} = body


    const author = await prisma.user.findUnique({
        where: { email: authorEmail },
    })

    if (!author) return res.status(400).json({error: 'Author not found'})

    const comment = await prisma.comment.create({
        data: {
            userId: author.id,
            postId,
            content,
          },
    })

    return res.status(200).json(comment)
  }



  export const getComments = async ({query} : NextApiRequest, res: NextApiResponse) => {
    if(!query.id) return res.status(400).json({error: 'Missing id'})

    const id = +query.id

    const verifiedId = await prisma.post.findUnique({
        where: { id: id },
        })

    if(!verifiedId) return res.status(400).json({error: 'Post not found'})

    const comments = await prisma.comment.findMany({
        where: { postId:id },
    })

    return res.status(200).json(comments)

  }


  export const deleteComment = async (
    { query }: NextApiRequest,
    res: NextApiResponse,
  ) => {

    if(!query.id) return res.status(400).json({error: 'Missing id'})

    const id = +query.id

    const verifiedId = await prisma.post.findUnique({
        where: { id: id },
        })

    if(!verifiedId) return res.status(400).json({error: 'Post not found'})


    await prisma.comment.delete({
      where: { id },
    })
    
    return res.status(200).json({message: 'Comment deleted'})
  }