"use client";

import { useToast } from "@/components/ui/use-toast";
import kyInstance from "@/lib/ky";
import { BookmarkInfo } from "@/lib/types";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";

interface useBookmarkedPostMutationProps {
  data: BookmarkInfo;
  postId: string;
  queryKey: QueryKey;
}

export default function useBookmarkedPostMutation({
  data,
  postId,
  queryKey,
}: useBookmarkedPostMutationProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      data.isBookmarkedByUser
        ? kyInstance.delete(`/api/posts/${postId}/bookmark`)
        : kyInstance.post(`/api/posts/${postId}/bookmark`),
    onMutate: async () => {
      toast({
        description: `Post ${data.isBookmarkedByUser ? "un" : ""}bookmarked`,
      });

      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<BookmarkInfo>(queryKey);

      queryClient.setQueryData<BookmarkInfo>(queryKey, () => ({
        isBookmarkedByUser: !previousState?.isBookmarkedByUser,
      }));

      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    },
  });
}
