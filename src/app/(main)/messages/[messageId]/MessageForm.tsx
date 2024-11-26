"use client";

import { ImageIcon, SendHorizonal } from "lucide-react";
import React from "react";
import { useSession } from "../../SessionProvider";
import { EditorContent, useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@/lib/utils";
import "./styless.css";
import { ScrollArea } from "@/components/ui/scroll-area";
import LoadingButton from "@/components/LoadingButton";
import { useSendMessageMutation } from "./mutations";
import useConversation from "@/hooks/useConversation";

const MessageForm = () => {
  const { messageId } = useConversation();

  const mutation = useSendMessageMutation();

  const textEditor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "Wanna write some thing?",
      }),
    ],
  });

  const input =
    textEditor?.getText({
      blockSeparator: "\n",
    }) || "";

  function onSubmit() {
    mutation.mutate({
      content: input,
      conversationId: messageId,
    });
    textEditor?.commands.clearContent();
  }
  return (
    <div className="flex w-full items-center gap-2 border-t bg-card px-4 py-4 lg:gap-4">
      {/* <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="ncfk4jjh"
      > */}
      <ImageIcon size={30} className="text-sky-500" />
      {/* </CldUploadButton> */}

      <div
        // onSubmit={handleSubmit(onSubmit)}
        className="flex w-full items-center gap-2 lg:gap-4"
      >
        <div className="relative w-full">
          <EditorContent
            editor={textEditor}
            className={cn(
              "no-scrollbar max-h-[10rem] w-full overflow-y-auto rounded-2xl bg-background px-5 py-3 outline-none",
            )}
          />
          {/* <input /> */}
        </div>

        <LoadingButton
          onClick={onSubmit}
          loading={mutation.isPending}
          disabled={!input.trim()}
          className="min-w-20"
        >
          <SendHorizonal size={18} className="" />
        </LoadingButton>
      </div>
    </div>
  );
};

export default MessageForm;
