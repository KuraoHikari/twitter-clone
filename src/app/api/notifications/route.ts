import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import {
  ERROR_RESPONSE_INTERNAL_SERVER_ERROR,
  ERROR_RESPONSE_UNAUTHORIZED,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
  STATUS_CODE_UNAUTHORIZED,
} from "@/lib/response";
import { notificationsInclude, NotificationsPage } from "@/lib/types";
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

    const pageSize = 5;

    const notifications = await prisma.notification.findMany({
      where: {
        recipientId: user.id,
      },
      include: notificationsInclude,
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor =
      notifications.length > pageSize ? notifications[pageSize].id : null;

    const data: NotificationsPage = {
      notifications: notifications.slice(0, pageSize),
      nextCursor,
    };
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: ERROR_RESPONSE_INTERNAL_SERVER_ERROR },
      { status: STATUS_CODE_INTERNAL_SERVER_ERROR },
    );
  }
}
