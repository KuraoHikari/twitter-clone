"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { ERROR_RESPONSE_UNAUTHORIZED } from "@/lib/response";

export async function createConversation(recipientId: string) {
  const { user } = await validateRequest();

  if (!user) throw new Error(ERROR_RESPONSE_UNAUTHORIZED);

  if (user.id === recipientId)
    throw new Error("Cannot create conversation with yourself");

  const existingConversation = await prisma.conversation.findFirst({
    where: {
      AND: [
        { users: { some: { id: user.id } } },
        { users: { some: { id: recipientId } } },
      ],
    },
  });

  if (existingConversation) throw new Error("Conversation already exists");

  const conversation = await prisma.conversation.create({
    data: {
      users: {
        connect: [{ id: user.id }, { id: recipientId }],
      },
      isGroup: false,
    },
    include: {
      users: true,
    },
  });

  return conversation;
}
