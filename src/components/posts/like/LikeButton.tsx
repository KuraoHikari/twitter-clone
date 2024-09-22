import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { LikeInfo } from "@/lib/types";
import { QueryKey } from "@tanstack/react-query";
import useQueryGetLike from "@/hooks/useQueryGetLike";
import useLikeUnlikePostMutation from "./mutations";
import { useSession } from "@/app/(main)/SessionProvider";

interface LikeButtonProps {
  postId: string;
  initialState: LikeInfo;
}

const LikeButton = ({ postId, initialState }: LikeButtonProps) => {
  const { user } = useSession();
  const queryKey: QueryKey = ["like-info", postId, user.id];

  const { data } = useQueryGetLike({ postId, initialState, queryKey });

  const { mutate, isPending } = useLikeUnlikePostMutation({
    postId,
    data,
    queryKey,
  });

  return (
    <button
      onClick={() => mutate()}
      className="flex items-center gap-2"
      disabled={isPending}
    >
      <Heart
        className={cn(
          "size-5",
          data.isLikedByUser && "fill-red-500 text-red-500",
        )}
      />

      <span className="text-sm font-medium tabular-nums">
        {data.likes} <span className="hidden sm:inline">likes</span>
      </span>
    </button>
  );
};

export default LikeButton;
