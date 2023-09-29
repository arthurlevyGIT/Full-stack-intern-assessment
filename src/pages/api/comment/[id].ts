import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// COMMENT /api/comment
// Required fields in body: authorEmail
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { content, authorEmail, postId } = req.body;

  const result = await prisma.comment.create({
    data: {
      content: content,
      author: { connect: { email: authorEmail } },
      postDetail: { connect: { id: parseInt(postId) } },
    },
  });
  //console.log(result);
  return res.status(201).json(result);
}
