"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import { PostsPage } from "@/lib/types";

// Custom Hook for Infinite Post Loading
const useInfiniteHashtagPosts = (hashtag: string) => {
  return useInfiniteQuery({
    queryKey: ["post-feed", "posts-hashtag", hashtag],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          `/api/posts/hashtag/${hashtag}`,
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};

export default useInfiniteHashtagPosts;
