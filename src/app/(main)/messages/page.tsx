import ConversationList from "@/components/conversation/ConversationList";
import TrendsSidebar from "@/components/TrendsSidebar";
import { Metadata } from "next";
import Header from "./[messageId]/Header";
import MessageBox from "./[messageId]/MessageBox";

export const metadata: Metadata = {
  title: "Messages",
};

export default function Page() {
  return (
    <main className="flex h-[720px] w-full min-w-0 gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <ConversationList />
      <div className="h-full w-full">
        <div className="flex h-full flex-col">
          <Header />
          {/* <div className="flex-1 overflow-y-auto">
            <MessageBox />
          </div> */}
          {/* <Body initialMessages={messages} />
          <Form /> */}
        </div>
      </div>
    </main>
  );
}
