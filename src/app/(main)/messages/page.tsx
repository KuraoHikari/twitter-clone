import ConversationList from "@/components/conversation/ConversationList";
import TrendsSidebar from "@/components/TrendsSidebar";
import { Metadata } from "next";
import Header from "./[messageId]/Header";
import MessageBox from "./[messageId]/MessageBox";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageForm from "./[messageId]/MessageForm";
import { PlusCircle } from "lucide-react";

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
    </main>
  );
}
