import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import {
  ERROR_RESPONSE_INTERNAL_SERVER_ERROR,
  ERROR_RESPONSE_UNAUTHORIZED,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
  STATUS_CODE_UNAUTHORIZED,
} from "@/lib/response";
import { getPostDataInclude, PostsPage } from "@/lib/types";
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

    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId: user.id,
      },
      include: {
        post: {
          include: getPostDataInclude(user.id),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor =
      bookmarks.length > pageSize ? bookmarks[pageSize].id : null;

    const data: PostsPage = {
      posts: bookmarks.slice(0, pageSize).map((bookmark) => bookmark.post),
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
