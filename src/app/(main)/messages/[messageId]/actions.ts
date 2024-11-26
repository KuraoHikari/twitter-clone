"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { ERROR_RESPONSE_UNAUTHORIZED } from "@/lib/response";
import { getMessagesDataInclude } from "@/lib/types";
import { createMessageSchema } from "@/lib/validation";

export async function sendMessage(input: {
  content: string;
  conversationId: string;
}) {
  const { user } = await validateRequest();

  if (!user) throw new Error(ERROR_RESPONSE_UNAUTHORIZED);

  const { content, conversationId } = createMessageSchema.parse(input);

  // Create message
  const newMessage = await prisma.message.create({
    data: {
      body: content,
      conversationId: conversationId,
      senderId: user.id,
    },
    include: getMessagesDataInclude(),
  });

  await prisma.conversation.update({
    where: {
      id: conversationId,
    },
    data: {
      lastMessageAt: newMessage.createdAt,
    },
  });

  return newMessage;
}
