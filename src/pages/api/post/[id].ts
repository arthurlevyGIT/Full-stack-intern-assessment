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

    case "PATCH":
      return handlePATCH(postId, res, req);
    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      );
  }
};

// GET /api/post/:id
async function handleGET(postId: unknown, res: NextApiResponse) {
  const post = await prisma.post.findUnique({
    where: { id: Number(postId) },
    include: {
      comments: true,
      author: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });

  if (!post) return res.status(404).json({ message: "Not Found" });

  return res.status(200).json(post);
}

// PATCH /api/post/:id
async function handlePATCH(
  postId: unknown,
  res: NextApiResponse,
  req: NextApiRequest ) {
  // TODO: Check that the destructured req.body contains non null values
  const { title, content, published } = req.body;

  const updatedPost = await prisma.post.update({
    where: { id: Number(postId) },
    data: {
      title: req.body.title,
      content: req.body.content
    },
  });
  return res.status(201).json(updatedPost);
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

// Apply authMiddleware only for non-GET requests
export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET" && req.method !== "PATCH") {
    return authMiddleware(handle)(req, res);
  } else {
    return handle(req, res);
  }
};
