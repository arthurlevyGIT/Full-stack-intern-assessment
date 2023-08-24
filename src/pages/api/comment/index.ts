import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "../middleware/authMiddleware";
import prisma from "../../../lib/prisma";

const handle = async (
    req: NextApiRequest,
    res: NextApiResponse,
) => {
    if (req.method !== 'POST')
        return res.status(405).json({ message: "Method Not Allowed" });

    // // TODO: check if postId and comment are non null values
    const { postId, text } = req.body;

    // TODO: Check if postId exists in db
    const comment = await prisma.comment.create({
        data: {
          text,
          author: { connect: { id: req.user.id } },
          post: { connect: { id: postId }, },
        },
    });

    // TODO: Fix 'error' message on the backend
    // while client used this endpoint
    return res.status(201).json(comment);
}

export default authMiddleware(handle);
