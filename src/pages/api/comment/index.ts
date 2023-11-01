import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import schema from "./schema";

// POST /api/comment
// Required fields in body: conetent, email, postId
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const validation = schema.safeParse(req.body);

  if (!validation.success) return res.json(validation.error.errors);

  const post = await prisma.post.findUnique({
    where: { id: req.body.postId },
  });

  if (!post) return res.json("post not found");

  await prisma.comment.create({
    data: {
      content: req.body.content,
      post: { connect: { id: post.id } },
      author: { connect: { email: req.body.authorEmail } },
    },
  });

  return res.json("your comment created sucessfully");
}
