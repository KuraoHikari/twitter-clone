"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import { FollowersPage, PostsPage } from "@/lib/types";

// Custom Hook for Infinite Post Loading
const useInfiniteFollowers = () => {
  return useInfiniteQuery({
    queryKey: ["followers"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/users/followers",
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<FollowersPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};

export default useInfiniteFollowers;
