import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET ALL COMMENTS OF A POST
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;

  const postId = parseInt(query.postId as string);

  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      include: { author: true },
    });

    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// CREATE A COMMENT
export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body = req.body;
    const comment = await prisma.comment.create({
      data: {
        content: body.content,
        author: {
          connect: { email: body.email }, // Use email from request body
        },
        post: {
          connect: { id: body.postId },
        },
      },
      include: { author: true }, // Include author information in the response
    });

    res.status(200).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
