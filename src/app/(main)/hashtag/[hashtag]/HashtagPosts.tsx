"use client";

import InfiniteScrollContainer from "@/components/infiniteScrollContainer";
import Post from "@/components/posts/Post";
import PostsLoadingSkeleton from "@/components/posts/PostsLoadingSkeleton";
import useInfiniteHashtagPosts from "@/hooks/useInfiniteHashtagPosts";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

interface HashtagPostsProps {
  hashtag: string;
}

const HashtagPosts = ({ hashtag }: HashtagPostsProps) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteHashtagPosts(hashtag);

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (status === "pending") {
    return <PostsLoadingSkeleton />;
  }

  if (status === "success" && !posts.length && !hasNextPage) {
    return redirect("/");
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading posts hashrtag.
      </p>
    );
  }

  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
};

export default HashtagPosts;
