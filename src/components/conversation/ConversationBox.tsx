import { cn } from "@/lib/utils";
import Avatar from "./Avatar";

const ConversationBox = () => {
  return (
    <div className="relative flex w-full cursor-pointer items-center space-x-3 rounded-lg p-3 transition hover:bg-neutral-100">
      <Avatar />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="mb-1 flex items-center justify-between">
            <p className="text-md font-medium text-gray-900">Kurao Hikari</p>

            <p className="text-xs font-light text-gray-400">18-3-2021</p>
          </div>
          <p
            className={cn(
              `truncate text-sm text-gray-500`,
              //     hasSeen ? "" : "font-medium text-black",
            )}
          >
            woi
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
