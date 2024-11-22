"use client";

import { cn } from "@/lib/utils";
import ConversationBox from "./ConversationBox";
import { PlusCircle, PlusIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import CreateConversationDialog from "./CreateConversationDialog";
import useInfiniteConversations from "@/hooks/useInfiniteConversations";
import { InfiniteScrollArea } from "../infiniteScrollArea";

const ConversationList = () => {
  const [showCreateConversationDialog, setShowCreateConversationDialog] =
    useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteConversations();

  const conversations = data?.pages.flatMap((page) => page.conversations) || [];

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const contentHeight = container.scrollHeight;
      const containerHeight = container.clientHeight;
      if (contentHeight <= containerHeight) {
        hasNextPage && !isFetching && fetchNextPage();
      }
    }
  }, [conversations, hasNextPage, isFetching, fetchNextPage]);

  return (
    <>
      <InfiniteScrollArea
        onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
        className={`h-full w-full border-gray-200 lg:w-96 lg:border-r`}
        ref={containerRef}
      >
        <div className="mx-3 mb-4 flex justify-between pt-4">
          <div className="text-2xl font-bold">Messages</div>
          <div
            onClick={() => setShowCreateConversationDialog(true)}
            className="cursor-pointer rounded-full bg-gray-500 p-2 text-gray-600 transition hover:opacity-75"
          >
            <PlusIcon className="h-4 w-4 text-white" />
          </div>
        </div>
        <div className="me-4">
          {conversations.map((conversation) => (
            <ConversationBox
              key={conversation.id}
              conversation={conversation}
            />
          ))}
          {isFetchingNextPage && (
            <div className="my-3 flex justify-center">
              <PlusCircle className="h-6 w-6 animate-spin" />
            </div>
          )}
        </div>
      </InfiniteScrollArea>
      <CreateConversationDialog
        open={showCreateConversationDialog}
        onClose={() => setShowCreateConversationDialog(false)}
      />
    </>
  );
};

export default ConversationList;
