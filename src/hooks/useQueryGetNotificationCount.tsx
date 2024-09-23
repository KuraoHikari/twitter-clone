"use client";

import kyInstance from "@/lib/ky";
import { NotificationCountInfo, UserData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

interface useQueryGetNotificationCountProps {
  initialState: NotificationCountInfo;
}

const useQueryGetNotificationCount = ({
  initialState,
}: useQueryGetNotificationCountProps) => {
  return useQuery({
    queryKey: ["unread-notification-count"],
    queryFn: () =>
      kyInstance
        .get("/api/notifications/unread-count")
        .json<NotificationCountInfo>(),
    initialData: initialState,
    refetchInterval: 60 * 1000,
  });
};

export default useQueryGetNotificationCount;
