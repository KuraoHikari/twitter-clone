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

const MessageForm = () => {
  const { user } = useSession();

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
    console.log(input);
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
        <button
          onClick={onSubmit}
          className="cursor-pointer rounded-full bg-sky-500 p-2 transition hover:bg-sky-600"
        >
          <SendHorizonal size={18} className="" />
        </button>
      </div>
    </div>
  );
};

export default MessageForm;
