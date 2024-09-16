"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { ERROR_RESPONSE_UNAUTHORIZED } from "@/lib/response";
import { getPostDataInclude } from "@/lib/types";

export async function deletePost(id: string) {
  const { user } = await validateRequest();

  if (!user) throw new Error(ERROR_RESPONSE_UNAUTHORIZED);

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) throw new Error("Post not found");

  if (post.userId !== user.id) throw new Error(ERROR_RESPONSE_UNAUTHORIZED);

  const deletePost = await prisma.post.delete({
    where: { id },
    include: getPostDataInclude(user.id),
  });

  return deletePost;
}
