import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { createConversation } from "./actions";
import { FollowersPage } from "@/lib/types";
import { validateRequest } from "@/auth";
import { ERROR_RESPONSE_UNAUTHORIZED } from "@/lib/response";

export default function useCreateConversationMutation(userId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createConversation,
    onSuccess: async (conversation) => {
      const queryFilter = { queryKey: ["create-conversation"] };

      await queryClient.cancelQueries(queryFilter);

      const followConversationReturn = conversation.users.filter(
        (u) => u.id !== userId,
      );

      queryClient.setQueriesData<InfiniteData<FollowersPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              followers: page.followers.filter(
                (f) => f.id !== followConversationReturn[0].id,
              ),
            })),
          };
        },
      );

      toast({
        description: "Conversation created",
      });
    },
    onError(error: string | Error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: error instanceof Error ? error.message : error,
      });
    },
  });
}
