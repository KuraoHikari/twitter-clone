import React from "react";
import { cn } from "@/lib/utils";
import UserAvatar from "../UserAvatar";

interface FollowersProps {
  avatarUrl: string | null | undefined;
  displayName: string;
  username: string;
  onClick?: () => void;
}

const Followers = ({
  avatarUrl,
  displayName,
  username,
  onClick,
}: FollowersProps) => {
  return (
    <div
      onClick={onClick}
      className="relative my-2 flex w-full cursor-pointer items-center space-x-3 rounded-lg bg-card p-3 transition-colors hover:bg-primary"
    >
      <UserAvatar avatarUrl={avatarUrl} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="mb-1 flex items-center justify-between">
            <p className="text-md font-medium">{displayName}</p>
          </div>
          <p className={cn(`truncate text-sm text-gray-500`)}>@{username}</p>
        </div>
      </div>
    </div>
  );
};

export default Followers;
