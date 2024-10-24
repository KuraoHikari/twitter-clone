import Avatar from "@/components/conversation/Avatar";
import { cn } from "@/lib/utils";
import React from "react";

const MessageBox = () => {
  return (
    <div className={cn("flex gap-3 p-4")}>
      <div className={cn("")}>
        <Avatar />
      </div>
      <div className={cn("flex flex-col gap-2")}>
        <div className="flex items-center gap-1">
          <div className="text-sm">Kurao</div>
          <div className="text-xs text-gray-500">18-03-2001</div>
        </div>
        <div
          className={cn(
            "w-fit overflow-hidden rounded-full bg-gray-100 px-3 py-2 text-sm dark:bg-gray-600",
          )}
        >
          <div>woi lagi santai kawan</div>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
