"use client";

import kyInstance from "@/lib/ky";
import { LikeInfo } from "@/lib/types";
import { QueryKey, useQuery } from "@tanstack/react-query";

interface useQueryGetLikeProps {
  queryKey: QueryKey;
  postId: string;
  initialState: LikeInfo;
}

const useQueryGetLike = ({
  queryKey,
  postId,
  initialState,
}: useQueryGetLikeProps) => {
  return useQuery({
    queryKey,
    queryFn: () =>
      kyInstance.get(`/api/posts/${postId}/likes`).json<LikeInfo>(),
    initialData: initialState,
    staleTime: Infinity,
  });
};

export default useQueryGetLike;
