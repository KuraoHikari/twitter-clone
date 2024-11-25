import React from "react";
import Header from "./Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBox from "./MessageBox";
import MessageForm from "./MessageForm";
import { cn } from "@/lib/utils";

interface MessageIdProps {
  messageId: string;
}

const MessageId = ({ messageId }: MessageIdProps) => {
  return (
    <div className="h-full w-full">
      <div className="flex h-full flex-col">
        <Header />
        <ScrollArea className={cn(`flex-1`)}>
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />

          <MessageBox />

          <MessageBox />
        </ScrollArea>
        <MessageForm />
      </div>
    </div>
  );
};

export default MessageId;
