import React from "react";
import { notFound } from "next/navigation";
import prisma from "../../../lib/prisma";
import PostDetails from "../../../components/PostDetails";
import Comments from "../../../components/Comments";

export default async function Post({ params }: { params: { id: string } }) {
  const id = Number(Array.isArray(params?.id) ? params?.id[0] : params?.id);
  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: true },
  });

  if (!post) notFound();

  const comments = await prisma.comment.findMany({
    where: { postId: post.id },
    include: { author: true },
  });

  return (
    <>
      <PostDetails {...post} />
      <Comments post={id} items={comments} />
    </>
  );
}
