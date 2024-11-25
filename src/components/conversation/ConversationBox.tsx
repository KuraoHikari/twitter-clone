"use client";

import { cn, formatRelativeDate } from "@/lib/utils";
import Avatar from "./Avatar";
import { ConversationData } from "@/lib/types";
import { useSession } from "@/app/(main)/SessionProvider";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface ConversationBoxProps {
  conversation: ConversationData;
  selected?: boolean;
}

const ConversationBox = ({ conversation, selected }: ConversationBoxProps) => {
  const { user } = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/messages/${conversation.id}`);
  }, [conversation, router]);

  const conversationUser = conversation.users.find(
    (userConv) => userConv.id !== user.id,
  );

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative my-1 flex w-full cursor-pointer items-center space-x-3 rounded-lg bg-card p-3 transition-colors hover:bg-primary",
        selected ? "bg-background" : "",
      )}
    >
      <Avatar />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="mb-1 flex items-center justify-between">
            <p className="text-md font-medium">
              {conversation.isGroup === false ? conversationUser?.username : ""}
            </p>

            <p className="text-xs font-light text-gray-500">
              {formatRelativeDate(conversation.lastMessageAt)}
            </p>
          </div>
          <p
            className={cn(
              `truncate text-sm text-gray-500`,
              //     hasSeen ? "" : "font-medium text-black",
            )}
          >
            {conversation.messages.length > 0
              ? conversation.messages[0].body
              : "no messages"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
