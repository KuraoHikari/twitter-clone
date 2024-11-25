import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import {
  ERROR_RESPONSE_INTERNAL_SERVER_ERROR,
  ERROR_RESPONSE_UNAUTHORIZED,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
  STATUS_CODE_UNAUTHORIZED,
} from "@/lib/response";
import { ConversationsPage, getConversationDataInclude } from "@/lib/types";

import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return Response.json(
        { error: ERROR_RESPONSE_UNAUTHORIZED },
        { status: STATUS_CODE_UNAUTHORIZED },
      );
    }

    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const pageSize = 10;

    const conversations = await prisma.conversation.findMany({
      where: {
        users: {
          some: {
            id: user.id,
          },
        },
      },
      include: {
        ...getConversationDataInclude(),
      },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        lastMessageAt: "desc",
      },
    });

    const nextCursor =
      conversations.length > pageSize ? conversations[pageSize].id : null;

    const data: ConversationsPage = {
      conversations: conversations.slice(0, pageSize).map((conversation) => ({
        ...conversation,
      })),
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: ERROR_RESPONSE_INTERNAL_SERVER_ERROR },
      { status: STATUS_CODE_INTERNAL_SERVER_ERROR },
    );
  }
}
