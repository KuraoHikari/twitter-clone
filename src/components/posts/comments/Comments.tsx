import { PostData } from "@/lib/types";

import { Loader2 } from "lucide-react";
import { Button } from "../../ui/button";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import useInfiniteComments from "@/hooks/useInfiniteComments";

interface CommentsProps {
  post: PostData;
}

export default function Comments({ post }: CommentsProps) {
  const { data, fetchNextPage, hasNextPage, isFetching, status } =
    useInfiniteComments({ post });

  const comments = data?.pages.flatMap((page) => page.comments) || [];

  return (
    <div className="space-y-3">
      <CommentInput post={post} />
      {hasNextPage && (
        <Button
          variant="link"
          className="mx-auto block"
          disabled={isFetching}
          onClick={() => fetchNextPage()}
        >
          Load previous comments
        </Button>
      )}
      {status === "pending" && <Loader2 className="mx-auto animate-spin" />}
      {status === "success" && !comments.length && (
        <p className="text-center text-muted-foreground">No comments yet.</p>
      )}
      {status === "error" && (
        <p className="text-center text-destructive">
          An error occurred while loading comments.
        </p>
      )}
      <div className="divide-y">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
