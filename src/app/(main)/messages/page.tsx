import ConversationList from "@/components/conversation/ConversationList";
import TrendsSidebar from "@/components/TrendsSidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages",
};

export default function Page() {
  return (
    <main className="flex h-[720px] w-full min-w-0 gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <ConversationList />
    </main>
  );
}
