import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "../middleware/authMiddleware";
import prisma from "../../../lib/prisma";

// GET /api/drafts
// Return all the drafts of an authenticated user
const handle = async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method Not Allowed" });

  const drafts = await prisma.post.findMany({
    where: { published: false, authorId: req.user.id },
    include: { author: false },
  });
  return res.status(201).json(drafts);
}

export default authMiddleware(handle);