import useQueryGetBookmark from "@/hooks/useQueryGetBookmark";
import { BookmarkInfo } from "@/lib/types";
import { cn } from "@/lib/utils";
import { QueryKey } from "@tanstack/react-query";
import { Bookmark } from "lucide-react";
import useBookmarkedPostMutation from "./mutations";

interface BookmarkButtonProps {
  postId: string;
  initialState: BookmarkInfo;
}

export default function BookmarkButton({
  postId,
  initialState,
}: BookmarkButtonProps) {
  const queryKey: QueryKey = ["bookmark-info", postId];

  const { data } = useQueryGetBookmark({ initialState, postId, queryKey });

  const { mutate } = useBookmarkedPostMutation({ data, postId, queryKey });

  return (
    <button onClick={() => mutate()} className="flex items-center gap-2">
      <Bookmark
        className={cn(
          "size-5",
          data.isBookmarkedByUser && "fill-primary text-primary",
        )}
      />
    </button>
  );
}
