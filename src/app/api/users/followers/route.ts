import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import {
  ERROR_RESPONSE_INTERNAL_SERVER_ERROR,
  ERROR_RESPONSE_UNAUTHORIZED,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
  STATUS_CODE_UNAUTHORIZED,
} from "@/lib/response";
import { FollowerInfo, FollowersPage, getUserDataSelect } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json(
        { error: ERROR_RESPONSE_UNAUTHORIZED },
        { status: STATUS_CODE_UNAUTHORIZED },
      );
    }
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const pageSize = 5;

    const followersList = await prisma.user.findMany({
      where: {
        NOT: {
          id: loggedInUser.id,
        },
        followers: {
          some: {
            followerId: loggedInUser.id,
          },
        },
      },
      select: {
        id: true,
        username: true,
        displayName: true,
        avatarUrl: true,
        bio: true,
        createdAt: true,
      },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor =
      followersList.length > pageSize ? followersList[pageSize].id : null;

    const data: FollowersPage = {
      followers: followersList.slice(0, pageSize).map((follower) => ({
        ...follower,
      })),
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {
    // console.error(error);
    return Response.json(
      { error: ERROR_RESPONSE_INTERNAL_SERVER_ERROR },
      { status: STATUS_CODE_INTERNAL_SERVER_ERROR },
    );
  }
}
