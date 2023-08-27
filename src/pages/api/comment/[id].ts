// Imports
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

/**
 * Crate a new comment.
 */
export const createComment = async (
    { body, query }: NextApiRequest,
    res: NextApiResponse,
) => {
    // Verificate the params
    if (!query.id) return res.status(400).json({ error: 'Missing id' })
    if (!body.authorEmail || !body.content) return res.status(400).json({ error: 'Missing fields' })

    // Convert the id to an integar
    const postId = +query.id

    // search the article with the post id
    const verifiedId = await prisma.post.findUnique({
        where: { id: postId },
    })
    if (!verifiedId) return res.status(400).json({ error: 'Post not found' })

    //fetch the datas comment from the request body
    const { authorEmail, content }: { authorEmail: string, content: string } = body

    //search the author
    const author = await prisma.user.findUnique({
        where: { email: authorEmail },
    })
    if (!author) return res.status(400).json({ error: 'Author not found' })

    // Create the comment in the db
    const comment = await prisma.comment.create({
        data: {
            userId: author.id,
            postId,
            content,
        },
    })

    return res.status(200).json(comment)
}

/**
 * fetch all the comment from the article
 */
export const getComments = async ({ query }: NextApiRequest, res: NextApiResponse) => {
    // verification of the params
    if (!query.id) return res.status(400).json({ error: 'Missing id' })

    // Convert the id to an integar
    const id = +query.id

    // search the article with the ID
    const verifiedId = await prisma.post.findUnique({
        where: { id: id },
    })
    if (!verifiedId) return res.status(400).json({ error: 'Post not found' })

    // fetch all the comment from the article
    const comments = await prisma.comment.findMany({
        where: { postId: id },
    })

    return res.status(200).json(comments)
}

/**
 * delete comment 
 */
export const deleteComment = async (
    { query }: NextApiRequest,
    res: NextApiResponse,
) => {
    // verification request params
    if (!query.id) return res.status(400).json({ error: 'Missing id' })

    // convert the id to an integar
    const id = +query.id

    // search the article with the ID
    const verifiedId = await prisma.post.findUnique({
        where: { id: id },
    })
    if (!verifiedId) return res.status(400).json({ error: 'Post not found' })

    // Suppress comments from the DB
    await prisma.comment.delete({
        where: { id },
    })

    return res.status(200).json({ message: 'Comment deleted' })
}
