import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "../middleware/authMiddleware";
import prisma from "../../../lib/prisma";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const postId = req.query.id;

  switch (req.method) {
    case "DELETE":
      return handleDELETE(postId, res, req);

    case "GET":
      return handleGET(postId, res);

    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      );
  }
};

async function handleGET(
  postId: unknown,
  res: NextApiResponse,
) {
  const post = await prisma.post.findUnique({
    where: { id: Number(postId) },
  });
  if (!post) return res.status(404).json({ message: "Not Found"});

  return res.status(200).json(post);
}

// DELETE /api/post/:id
async function handleDELETE(
  postId: unknown,
  res: NextApiResponse<any>,
  req: NextApiRequest
) {
  const post = await prisma.post.findUnique({
    where: { id: Number(postId) },
  });

  if (!post) return res.status(404).json({ message: "Post Not Found" });

  // Check if the user owns the post
  if (post?.authorId === req.user.id) {
    await prisma.post.delete({
      where: { id: Number(postId) },
    });
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }

  return res.json(post);
}

export default authMiddleware(handle);
