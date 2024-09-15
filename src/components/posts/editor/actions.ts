"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { ERROR_RESPONSE_UNAUTHORIZED } from "@/lib/response";
import { postDataInclude } from "@/lib/types";
import { createPostSchema } from "@/lib/validation";

export async function submitPost(input: string) {
  const { user } = await validateRequest();

  if (!user) throw new Error(ERROR_RESPONSE_UNAUTHORIZED);

  const { content } = createPostSchema.parse({ content: input });

  const newPost = await prisma.post.create({
    data: {
      content,
      userId: user.id,
    },
    include: postDataInclude,
  });

  return newPost;
}
