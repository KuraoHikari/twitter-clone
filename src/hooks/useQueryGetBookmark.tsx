"use client";

import kyInstance from "@/lib/ky";
import { BookmarkInfo, LikeInfo } from "@/lib/types";
import { QueryKey, useQuery } from "@tanstack/react-query";

interface useQueryGetLikeProps {
  queryKey: QueryKey;
  postId: string;
  initialState: BookmarkInfo;
}

const useQueryGetBookmark = ({
  queryKey,
  postId,
  initialState,
}: useQueryGetLikeProps) => {
  return useQuery({
    queryKey,
    queryFn: () =>
      kyInstance.get(`/api/posts/${postId}/bookmark`).json<BookmarkInfo>(),
    initialData: initialState,
    staleTime: Infinity,
  });
};

export default useQueryGetBookmark;
