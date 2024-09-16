import PostEditor from "@/components/posts/editor/PostEditor";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import ForYouFeed from "./ForYouFeed";
import TrendsSideBar from "@/components/TrendsSidebar";

export default function Home() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />

        <Tabs defaultValue="for-you" className="mb-2">
          <TabsList>
            <TabsTrigger value="for-you">For you</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>
          <TabsContent value="for-you">
            <ForYouFeed />
          </TabsContent>
          <TabsContent value="following">Following</TabsContent>
        </Tabs>
      </div>
      <TrendsSideBar />
    </main>
  );
}
