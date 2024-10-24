import { ImageIcon, SendHorizonal } from "lucide-react";
import React from "react";

const MessageForm = () => {
  return (
    <div className="flex w-full items-center gap-2 border-t bg-card px-4 py-4 lg:gap-4">
      {/* <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="ncfk4jjh"
      > */}
      <ImageIcon size={30} className="text-sky-500" />
      {/* </CldUploadButton> */}

      <form
        // onSubmit={handleSubmit(onSubmit)}
        className="flex w-full items-center gap-2 lg:gap-4"
      >
        <div className="relative w-full">
          <input className="w-full rounded-full bg-background px-4 py-2 font-light focus:outline-none" />
        </div>
        <button
          type="submit"
          className="cursor-pointer rounded-full bg-sky-500 p-2 transition hover:bg-sky-600"
        >
          <SendHorizonal size={18} className="" />
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
