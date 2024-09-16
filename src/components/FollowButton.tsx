"use client";

import useFollowerInfo from "@/hooks/useFollowerInfo";
import { FollowerInfo } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useFollowMutation } from "@/hooks/useFollowMutation"; // Import the new hook

interface FollowButtonProps {
  userId: string;
  initialState: FollowerInfo;
}

const FollowButton = ({ userId, initialState }: FollowButtonProps) => {
  const { data } = useFollowerInfo(userId, initialState);
  const queryKey = ["follower-info", userId];

  const { mutate, isPending } = useFollowMutation(userId, queryKey, data);

  return (
    <Button
      disabled={isPending}
      variant={data.isFollowedByUser ? "secondary" : "default"}
      onClick={() => mutate()}
    >
      {data.isFollowedByUser ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;
