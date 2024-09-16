"use client";

import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import { useToast } from "@/components/ui/use-toast";
import { FollowerInfo } from "@/lib/types";

export function useFollowMutation(
  userId: string,
  queryKey: QueryKey,
  data: FollowerInfo,
) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () =>
      data.isFollowedByUser
        ? kyInstance.delete(`/api/users/${userId}/followers`)
        : kyInstance.post(`/api/users/${userId}/followers`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<FollowerInfo>(queryKey);

      queryClient.setQueryData<FollowerInfo>(queryKey, () => ({
        followers:
          (previousState?.followers || 0) +
          (previousState?.isFollowedByUser ? -1 : 1),
        isFollowedByUser: !previousState?.isFollowedByUser,
      }));

      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error("🚀 ~ onError ~ error:", error);

      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    },
  });
}
