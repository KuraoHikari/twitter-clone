"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { ERROR_RESPONSE_UNAUTHORIZED } from "@/lib/response";
import { getCommentDataInclude, PostData } from "@/lib/types";
import { createCommentSchema } from "@/lib/validation";

export async function submitComment({
  post,
  content,
}: {
  post: PostData;
  content: string;
}) {
  const { user } = await validateRequest();

  if (!user) throw new Error(ERROR_RESPONSE_UNAUTHORIZED);

  const { content: contentValidated } = createCommentSchema.parse({
    content,
  });

  const newComment = await prisma.comment.create({
    data: {
      content: contentValidated,
      postId: post.id,
      userId: user.id,
    },
    include: getCommentDataInclude(user.id),
  });

  if (newComment && post.user.id !== user.id) {
    await prisma.notification.create({
      data: {
        issuerId: user.id,
        recipientId: post.user.id,
        postId: post.id,
        type: "COMMENT",
      },
    });
  }

  return newComment;
}

export async function deleteComment(id: string) {
  const { user } = await validateRequest();

  if (!user) throw new Error(ERROR_RESPONSE_UNAUTHORIZED);

  const comment = await prisma.comment.findUnique({
    where: { id },
  });

  if (!comment) throw new Error("Comment not found");

  if (comment.userId !== user.id) throw new Error(ERROR_RESPONSE_UNAUTHORIZED);

  const deleteComment = await prisma.comment.delete({
    where: { id },
    include: getCommentDataInclude(user.id),
  });

  return deleteComment;
}
