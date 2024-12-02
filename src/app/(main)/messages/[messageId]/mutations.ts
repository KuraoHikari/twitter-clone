import { useToast } from "@/components/ui/use-toast";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { sendMessage } from "./actions";
import { ConversationsPage } from "@/lib/types";

export function useSendMessageMutation() {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: async (newMessage) => {
      const queryFilter = {
        queryKey: ["conversations"],
      } satisfies QueryFilters;

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<
        InfiniteData<ConversationsPage, string | null>
      >(queryFilter, (oldData) => {
        if (!oldData) return oldData;

        // Find the index of the conversation page that the message belongs to
        const conversationPageIndex = oldData.pages.findIndex((page) => {
          return page.conversations.some((conversation) => {
            return conversation.id === newMessage.conversationId;
          });
        });

        if (conversationPageIndex === -1) return oldData;
        // console.log(
        //   "🚀 ~ onSuccess: ~ conversationPageIndex:",
        //   conversationPageIndex,
        // );

        // Find the conversation that the message belongs to
        const conversation = oldData.pages[
          conversationPageIndex
        ].conversations.find((conversation) => {
          return conversation.id === newMessage.conversationId;
        });

        if (!conversation) return oldData;

        // Add the new message to the conversation
        conversation.messages.unshift(newMessage);

        //remove conversation from the list if not the first one
        if (conversationPageIndex !== 0) {
          oldData.pages[conversationPageIndex].conversations = oldData.pages[
            conversationPageIndex
          ].conversations.filter((conv) => {
            return conv.id !== newMessage.conversationId;
          });
        }

        //if the conversation is in the first page, move it to the top
        if (conversationPageIndex === 0) {
          oldData.pages[0].conversations =
            oldData.pages[0].conversations.filter((conv) => {
              return conv.id !== newMessage.conversationId;
            });
        }

        // Add the conversation back to the first page
        oldData.pages[0].conversations.unshift(conversation);

        // Return the updated data
        return oldData;
      });

      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
      });

      // Optionally, show a success toast
      toast({
        title: "Message sent",
        description: "Your message has been sent successfully.",
      });
    },
  });

  return mutation;
}
