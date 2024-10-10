import { cn } from "@/lib/utils";
import ConversationBox from "./ConversationBox";
import { ScrollArea } from "../ui/scroll-area";

const ConversationList = () => {
  return (
    <>
      <ScrollArea
        className={cn(`h-full w-full border-r border-gray-200 lg:w-80`)}
      >
        <div className="">
          {/* {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))} */}
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
          <ConversationBox />
          <ConversationBox />
        </div>
      </ScrollArea>
    </>
  );
};

export default ConversationList;
