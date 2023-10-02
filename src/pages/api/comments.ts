import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handle(
  req: NextApiRequest, 
  res: NextApiResponse
  ) {
  const { postId } = req.query;

  try {
    if (!postId) return res.status(400).json({ error: 'postId is required' });
    const comments = await prisma.comment.findMany({
      where: { postId: Number(postId) },
      include: { author: true }, 
    });
    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching comments' });
  }


}
