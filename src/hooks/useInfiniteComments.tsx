import kyInstance from "@/lib/ky";
import { CommentsPage, PostData } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";

interface useInfiniteCommentsProps {
  post: PostData;
}

const useInfiniteComments = ({ post }: useInfiniteCommentsProps) => {
  const query = useInfiniteQuery({
    queryKey: ["comments", post.id],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          `/api/posts/${post.id}/comments`,
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<CommentsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (firstPage) => firstPage.previousCursor,
    select: (data) => ({
      pages: [...data.pages].reverse(),
      pageParams: [...data.pageParams].reverse(),
    }),
  });
  return query;
};

export default useInfiniteComments;
