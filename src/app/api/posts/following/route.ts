import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import {
  ERROR_RESPONSE_INTERNAL_SERVER_ERROR,
  ERROR_RESPONSE_UNAUTHORIZED,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
  STATUS_CODE_OK,
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

    const pageSize = 10;

    const posts = await prisma.post.findMany({
      where: {
        user: {
          followers: {
            some: {
              followerId: user.id,
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
      include: getPostDataInclude(user.id),
    });

    const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;

    const data: PostsPage = {
      posts: posts.slice(0, pageSize),
      nextCursor,
    };

    return Response.json(data, { status: STATUS_CODE_OK });
  } catch (error) {
    return Response.json(
      { error: ERROR_RESPONSE_INTERNAL_SERVER_ERROR },
      { status: STATUS_CODE_INTERNAL_SERVER_ERROR },
    );
  }
}
