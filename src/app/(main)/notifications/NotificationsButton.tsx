"use client";

import { Button } from "@/components/ui/button";
import useQueryGetNotificationCount from "@/hooks/useQueryGetNotificationCount";
import { NotificationCountInfo } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NotificationsButtonProps {
  initialState: NotificationCountInfo;
  href: string;
}

export default function NotificationsButton({
  initialState,
  href,
}: NotificationsButtonProps) {
  const { data } = useQueryGetNotificationCount({ initialState });

  const pathname = usePathname();

  // Determine if this menu item is active
  const isActive = pathname === href;

  return (
    <Button
      variant="ghost"
      className={cn(
        "flex items-center justify-start gap-3",
        isActive ? "text-primary" : "text-foreground",
      )}
      title="Notifications"
      asChild
    >
      <Link href={href}>
        <div className="relative">
          <Bell />
          {!!data.unreadCount && (
            <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1 text-xs font-medium tabular-nums text-primary-foreground">
              {data.unreadCount}
            </span>
          )}
        </div>
        <span className="hidden lg:inline">Notifications</span>
      </Link>
    </Button>
  );
}
