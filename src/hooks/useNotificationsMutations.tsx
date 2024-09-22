"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import kyInstance from "@/lib/ky";

export function useNotificationsMutations() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => kyInstance.patch("/api/notifications/mark-as-read"),
    onSuccess: () => {
      queryClient.setQueryData(["unread-notification-count"], {
        unreadCount: 0,
      });
    },
    onError(error) {
      console.error("Failed to mark notifications as read", error);
    },
  });
}
