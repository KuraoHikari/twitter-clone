"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { ERROR_RESPONSE_UNAUTHORIZED } from "@/lib/response";
import { getMessagesDataInclude } from "@/lib/types";
import { createMessageSchema } from "@/lib/validation";

export async function sendMessage(
  input: { content: string },
  conversationId: string,
) {
  const { user } = await validateRequest();

  if (!user) throw new Error(ERROR_RESPONSE_UNAUTHORIZED);

  const { content } = createMessageSchema.parse(input);

  // Create message
  const newMessage = await prisma.message.create({
    data: {
      body: content,
      conversationId,
      senderId: user.id,
    },
    include: getMessagesDataInclude(),
  });

  return newMessage;
}
