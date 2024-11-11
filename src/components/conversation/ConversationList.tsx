"use client";

import { cn } from "@/lib/utils";
import ConversationBox from "./ConversationBox";
import { ScrollArea } from "../ui/scroll-area";
import { PlusCircle, PlusIcon } from "lucide-react";
import { useState } from "react";
import CreateConversationDialog from "./CreateConversationDialog";

const ConversationList = () => {
  const [showCreateConversationDialog, setShowCreateConversationDialog] =
    useState(false);
  return (
    <>
      <ScrollArea
        className={cn(`h-full w-full border-gray-200 lg:w-96 lg:border-r`)}
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
          {/* {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))} */}
          {/* <ConversationBox />
          <ConversationBox />
          <ConversationBox />
          <ConversationBox />
          <ConversationBox />
          <ConversationBox />
          <ConversationBox />
          <ConversationBox />
          <ConversationBox />
          <ConversationBox />
          <ConversationBox />
          <ConversationBox />
          <ConversationBox />
          <ConversationBox />
          <ConversationBox />
          <ConversationBox /> */}
        </div>
      </ScrollArea>
      <CreateConversationDialog
        open={showCreateConversationDialog}
        onClose={() => setShowCreateConversationDialog(false)}
      />
    </>
  );
};

export default ConversationList;
