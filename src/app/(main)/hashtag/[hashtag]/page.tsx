import { validateRequest } from "@/auth";
import TrendsSidebar from "@/components/TrendsSidebar";
import { Metadata } from "next";
import HashtagPosts from "./HashtagPosts";

interface PageProps {
  params: { hashtag: string };
}

export async function generateMetadata({
  params: { hashtag },
}: PageProps): Promise<Metadata> {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) return {};

  return {
    title: `#${hashtag}`,
  };
}

export default function Page({ params: { hashtag } }: PageProps) {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="rounded-2xl bg-card p-5 shadow-sm">
          <h1 className="text-center text-2xl font-bold">
            Hashtag{"'"}s #{hashtag}
          </h1>
        </div>
        <HashtagPosts hashtag={hashtag} />
      </div>
      <TrendsSidebar />
    </main>
  );
}
