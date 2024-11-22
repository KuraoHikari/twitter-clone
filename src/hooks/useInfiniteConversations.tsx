"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import { ConversationsPage, FollowersPage, PostsPage } from "@/lib/types";

// Custom Hook for Infinite Post Loading
const useInfiniteConversations = () => {
  return useInfiniteQuery({
    queryKey: ["conversations"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/conversations",
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<ConversationsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};

export default useInfiniteConversations;
