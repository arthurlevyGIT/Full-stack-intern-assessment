import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(
	  req: NextApiRequest,
	    res: NextApiResponse,
) {
	const content = req.body.content;
	const postId = req.query.id;
	const result = await prisma.comment.create({
		data: {
			content: content,
			post: { connect: { id: Number(postId) } },
		},
		include: { post: true },
	})
	return res.status(201).json(result)
}
