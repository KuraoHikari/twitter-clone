import ConversationList from "@/components/conversation/ConversationList";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages",
};

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-[720px] w-full min-w-0 gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <ConversationList />
      {children}
      {/* <div className="h-full w-full">
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
      </div> */}
    </main>
  );
}
